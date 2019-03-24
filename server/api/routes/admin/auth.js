const bcrypt = require('bcryptjs');
const dbDebugger = require('debug')('app:db');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../middlewares/admin/auth');
const admin = require('../../../middlewares/admin/admin');

// Helpers
const { generateJwtToken } = require('../../../helpers/jwt_access_token');

// Validatins
const validateRegisterInput = require('../../../validations/admin/register');
const validateLoginInput = require('../../../validations/admin/login');

// Models
const User = require('../../../models/admin/user');

// @route  POST /api/admin/login
// @des    Admin login
// @access Public
router.post('/login', (req, res) => {
  // Validate user input
  const { errors } = validateLoginInput(req.body);
  if (errors) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // Check user email
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "Email or password incorrect!" });
      } else {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // Payload
              const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status
              };
              // Generate jwt access token
              generateJwtToken(payload, (token) => {
                if (token) {
                  return res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                    user: payload
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

// @route  Post /api/admin/register
// @des    Admin register
// @access Public
router.post('/register', (req, res) => {
  // Validate user input
  const { errors } = validateRegisterInput(req.body);
  if (errors) return res.status(400).json(errors);

  // Check user already exist or not
  User.findOne({ email: req.body.email })
    .then(user => {
      // If user exits return
      if (user) {
        return res.status(409).json({ "error": "User already exist" })
      } else {
        // Extrecting user information
        const user = new User(_.pick(req.body, ["name", "email", "password"]));
        // Generate user password
        const salt = bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            // Store user to DB
            user.save()
              .then(user => res.status(201).json(_.pick(user, ["_id", "name", "email", "isAdmin","status"])))
              .catch(err => {
                res.status(400).json({ "error": "Something error!" });
                dbDebugger(err)
              });
          });
        });
      }
    })
    .catch(err => {
      res.status(400).json({ "error": "Something error!" });
      dbDebugger(err)
    });
});

// @route  GET /api/me
// @des    Login user info
// @access Private
router.get('/me',[auth, admin], (req, res)=>{
  res.status(200).json(_.pick(req.user, ["_id", "name", "email", "isAdmin",  "status"]));
});

module.exports = router;