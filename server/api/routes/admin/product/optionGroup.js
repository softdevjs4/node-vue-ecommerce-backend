const slugify = require('slugify');
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../../middlewares/admin/auth');
const admin = require('../../../../middlewares/admin/admin');

// Validation
const validateOptionGroupInput = require('../../../../validations/admin/product/optionGroup');

// Model
const OptionGroup = require('../../../../models/admin/product/optionGroup');

// Helpers
const somethinError = require('../../../../helpers/something_error');

// @route  GET /api/admin/product/option-groups
// @des    Get all product option groups
// @access Private
router.get('/', [auth, admin], (req, res) => {

  OptionGroup.find()
    .sort({ name: 1 })
    .then(optionGroups => {
      // No option group found
      if (!optionGroups) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'optionGroups': optionGroups });
    })
    .catch(err => somethinError(res, err));
});

// @route  GET /api/admin/product/option-groups/:id
// @des    Get product option group by id
// @access Private
router.get('/:id', [auth, admin], (req, res) => {

  OptionGroup.findById(req.params.id)
    .then(optinGroup => {
      // No option group found
      if (!optinGroup) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'optinGroup': optinGroup });
    })
    .catch(err => somethinError(res, err));
});

// @route  POST /api/admin/product/option-groups
// @des    Create option group
// @access Private
router.post('/', [auth, admin], (req, res) => {
  const { errors } = validateOptionGroupInput(req.body);
  if (errors) return res.status(400).json(errors);
 
  let optionGroupName = (req.body.name).toLowerCase();
  // Check option group already exist or not
  OptionGroup.findOne({ name: optionGroupName })
    .then(optionGroup => {
      if (optionGroup) {
        return res.status(409).json({ name: "Option group already exist!" });
      } else {
        
        // Create new option group
        const newOptionGroup = new OptionGroup({
          name: optionGroupName,
          slug: slugify(optionGroupName)
        });
        // Save to DB
        newOptionGroup.save()
          .then(optionGroup => res.status(201).json({ success: true, optionGroup: optionGroup }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  PUT /api/admin/product/option-groups/:id
// @des    Update option group by id
// @access Private
router.put('/:id', [auth, admin], (req, res) => {
  const { errors } = validateOptionGroupInput(req.body);
  if (errors) return res.status(400).json(errors);

  let optionGroupName = (req.body.name).toLowerCase();
  // Check option group exist or not
  OptionGroup.findById(req.params.id)
    .then(optionGroup => {
      if (!optionGroup) {
        return res.status(404).json({ error: "Option Groupe Not Found!" });
      } else {
        // Update option groupe
        optionGroup.name = optionGroupName;
        optionGroup.slug = slugify(optionGroupName);
        // Save to DB
        optionGroup.save()
          .then(optionGroup => res.status(200).json({ success: true, optionGroup: optionGroup }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  DELETE /api/admin/product/option-groups/:id
// @des    Delete option group by id
// @access Private
router.delete('/:id', [auth, admin], (req, res) => {
  // Check option group exist or not
  OptionGroup.findById(req.params.id)
    .then(optionGroup => {
      if (!optionGroup) {
        return res.status(404).json({ error: "Option Groupe Not Found!" });
      } else {
        // Delete option groupe
        optionGroup.delete()
          .then(optionGroup => res.status(200).json({ success: true, optionGroup: optionGroup }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

module.exports = router;