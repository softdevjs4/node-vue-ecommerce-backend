const slugify = require('slugify');
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../../middlewares/admin/auth');
const admin = require('../../../../middlewares/admin/admin');

// Validation
const validateManufacturerInput = require('../../../../validations/admin/product/productManufacturer');

// Model
const ProductManufacturer = require('../../../../models/admin/product/productManufacturer');

// Helpers
const somethinError = require('../../../../helpers/something_error');
// Image upload
const { multerParser } = require('../../../../utils/cloudinary');
// Delete image
const { deleteServerImage } = require('../../../../utils/cloudinary');


// @route  GET /api/admin/product/manufacturers
// @des    Get all product manufacturers
// @access Private
router.get('/', [auth, admin], (req, res) => {

  ProductManufacturer.find()
    .sort({
      name: 1
    })
    .then(mfrs => {
      // No manufacturers found
      if (!mfrs) return res.status(404).json({
        success: false,
        error: 'No data found!'
      });

      return res.status(200).json({
        success: true,
        'manufacturers': mfrs
      });
    })
    .catch(err => somethinError(res, err));
});

// @route  GET /api/admin/product/manufacturers/:id
// @des    Get product manufacturers by id
// @access Private
router.get('/:id', [auth, admin], (req, res) => {

  ProductManufacturer.findById(req.params.id)
    .then(mfr => {
      // No manufacturers found
      if (!mfr) return res.status(404).json({
        success: false,
        error: 'No data found!'
      });

      return res.status(200).json({
        success: true,
        'manufacturers': mfr
      });
    })
    .catch(err => somethinError(res, err));
});

// @route  POST /api/admin/product/manufacturers
// @des    Create product manufacturer
// @access Private
router.post('/', [auth, admin, multerParser.single("image")], (req, res) => {
  const {
    errors
  } = validateManufacturerInput(req.body);
  if (errors) return res.status(400).json(errors);
   let mfrName = (req.body.name).toLowerCase();
  // Check manufacturer already exist or not
  ProductManufacturer.findOne({ name: mfrName })
    .then(cat => {
      if (cat) {
        return res.status(409).json({ name: "Manufacturer already exist!" });
      } else {
        // Create new manufacturer
        const newMfr = new ProductManufacturer({
          name: mfrName,
          slug: slugify(mfrName),
          url : req.body.url
        });

        // If image found
        if(req.file){
          newMfr.image = {
            id: req.file.public_id,
            url: req.file.url
          }
        }

        // Save to DB
        newMfr.save()
          .then(mfr => res.status(201).json({ success: true, manufacturer: mfr }))
          .catch(err => somethinError(res, err));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  PUT /api/admin/product/manufacturer/:id
// @des    Update product manufacturer by id
// @access Private
router.put('/:id', [auth, admin, multerParser.single("image")], (req, res) => {
  const {
    errors
  } = validateManufacturerInput(req.body);
  if (errors) return res.status(400).json(errors);

  let mfrName = (req.body.name).toLowerCase();
  // Check manufacturer exist or not
  ProductManufacturer.findById(req.params.id)
    .then(mfr => {
      if (!mfr) {
        return res.status(404).json({
          error: "Manufacturer Not Found!"
        });
      } else {
        // Update manufacturer
        mfr.name = mfrName;
        mfr.slug = slugify(mfrName);
        mfr.url = req.body.url;
        // If new image found
        if(req.file){
          // Delete old image from server
          if(mfr.image){
            const result = deleteServerImage(mfr.image.id);
            if(result) console.log(result);
          }
          // Set new image
          mfr.image = {
            id: req.file.public_id,
            url: req.file.url
          }
        }
        // Save to DB
        mfr.save()
          .then(mfr => res.status(200).json({
            success: true,
            manufacturer: mfr
          }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  DELETE /api/admin/product/manufacturer/:id
// @des    Delete product manufacturer by id
// @access Private
router.delete('/:id', [auth, admin], (req, res) => {
  // Check manufacturer exist or not
  ProductManufacturer.findById(req.params.id)
    .then(mfr => {
      if (!mfr) {
        return res.status(404).json({
          error: "Manufacturer Not Found!"
        });
      } else {
        // Delete old image from server
        if(mfr.image){
          const result = deleteServerImage(mfr.image.id);
          if(result) console.log(result);
        }
        // Delete manufacturer
        mfr.delete()
          .then(mfr => res.status(200).json({
            success: true,
            manufacturer: mfr
          }))
          .catch(err => somethinError(res, err));
      }
    })
    .catch(err => somethinError(res, err));

});

module.exports = router;