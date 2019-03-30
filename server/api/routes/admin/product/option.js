const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../../middlewares/admin/auth');
const admin = require('../../../../middlewares/admin/admin');

// Validation
const validateOptionInput = require('../../../../validations/admin/product/option');

// Model
const Option = require('../../../../models/admin/product/option');

// Helpers
const somethinError = require('../../../../helpers/something_error');

// @route  GET /api/admin/product/options
// @des    Get all options
// @access Private
router.get('/', [auth, admin], (req, res) => {

  Option.find()
    .populate('optionGroup', ['_id','name'])
    .sort({ name: 1 })
    .then(options => {
      // No option found
      if (!options) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'options': options });
    })
    .catch(err => somethinError(res, err));
});

// @route  GET /api/admin/product/options/:id
// @des    Get options by id
// @access Private
router.get('/:id', [auth, admin], (req, res) => {

  Option.findById(req.params.id)
    .populate('optionGroup',  ['_id', 'name'])
    .then(option => {
      // No option found
      if (!option) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'option': option });
    })
    .catch(err => somethinError(res, err));
});

// @route  POST /api/admin/product/options
// @des    Create options
// @access Private
router.post('/', [auth, admin], (req, res) => {
  const { errors } = validateOptionInput(req.body);
  if (errors) return res.status(400).json(errors);

  // let optionName = (req.body.name).toLowerCase();
   let optionName = req.body.name;
  // Check option already exist or not
  Option.findOne({ name: optionName })
    .then(option => {
      if (option) {
        return res.status(409).json({ name: "Option already exist!" });
      } else {
        // Create new option
        const newOption = new Option({
          optionGroup: req.body.optionGroup,
          name: optionName,
          other: req.body.other,
          note: req.body.note
        });
        // Save to DB
        newOption.save()
          .then(option => {
            // Return option with oprion group details
            Option.findById(option._id)
              .populate('optionGroup')
              .then(option=>{
                res.status(201).json({ success: true, option: option })
              })
              .catch(err => somethinError(res));
          })
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  PUT /api/admin/product/options/:id
// @des    Update option by id
// @access Private
router.put('/:id', [auth, admin], (req, res) => {
  const { errors } = validateOptionInput(req.body);
  if (errors) return res.status(400).json(errors);

  let optionName = req.body.name;
  // Check option exist or not
  Option.findById(req.params.id)
    .then(option => {
      if (!option) {
        return res.status(404).json({ error: "Option Not Found!" });
      } else {
        // Update option
        option.optionGroup = req.body.optionGroup;
        option.name = optionName;
        option.other = req.body.other;
        option.note = req.body.note

        // Save to DB
        option.save()
          .then(option => {
            // Return option with option group details
            Option.findById(option._id)
              .populate('optionGroup')
              .then(option=>{
                res.status(201).json({ success: true, option: option })
              })
              .catch(err => somethinError(res));
          })
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  DELETE /api/admin/product/options/:id
// @des    Delete option by id
// @access Private
router.delete('/:id', [auth, admin], (req, res) => {
  // Check option exist or not
  Option.findById(req.params.id)
    .then(option => {
      if (!option) {
        return res.status(404).json({ error: "Option Not Found!" });
      } else {
        // Delete option
        option.delete()
          .then(option => res.status(200).json({ success: true, option: option }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

module.exports = router;