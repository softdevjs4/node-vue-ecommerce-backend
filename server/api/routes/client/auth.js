const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

// Helpers
const { generateJwtToken } = require('../../../helpers/jwt_access_token');
const { somethingError } = require('../../../helpers/errors_response');

// Validation
const validateRegisterInput = require('../../../validations/client/auth/register');
const validateLoginInput = require('../../../validations/client/auth/login');
// Model
const Customer = require('../../../models/client/customer');

// @route  POST /api/login
// @des    Customer login
// @access Public
router.post('/login', (req, res) => {
  // Validate customer input
  const { errors } = validateLoginInput(req.body);
  if (errors) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // Check cutomer email
  Customer.findOne({ email: email })
    .then(customer => {
      if (!customer) {
        return res.status(404).json({ error: true, email: "Email or password incorrect!" });
      } else {
        bcrypt.compare(password, customer.password)
          .then(isMatch => {
            if (isMatch) {
              // Payload
              const payload = {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                status: customer.status
              };
              // Generate jwt access token
              generateJwtToken(payload, (token) => {
                if (token) {
                  return res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                    customer: payload
                  });
                } else {
                  throw new Error();
                }
              });
            } else {
              throw new Error();
            }
          })
          .catch(err => res.status(404).json({ error: true, email: "Email or password incorrect!" }))
      }
    })
    .catch(err => res.status(404).json({ error: true, email: "Email or password incorrect!" }));
});

// @route  POST /api/register
// @des    Client register
// @access Public
router.post('/register', (req, res) => {
  const { errors } = validateRegisterInput(req.body);
  if (errors) return res.status(400).json(errors);
  
  // Check customer already exist or not
  Customer.findOne({email: req.body.email})
  .then(customer => {
    // If customer exist return
    if(customer){
      return res.status(409).json({"error": "customer already exist"})
    }else{
      // Extract customer info
      const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Generate password
      // Salt
      bcrypt.genSalt(10, (err, salt)=>{
        if(err) throw err;
        bcrypt.hash(customer.password, salt, (err, hash)=>{
          if(err) throw err;
          customer.password = hash;
          // Store customer to DB
          customer.save()
          .then(customer => {
            res.status(201).json({
              success: true,
              customer: {
                name: customer.name,
                email: customer.email,
                status: customer.status
              }
            })
          })
          .catch(err => somethingError(res, err));
        });
      });
    }
  })
  .catch(err => somethingError(res, err));
});

module.exports = router;