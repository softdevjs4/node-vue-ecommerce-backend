const slugify = require('slugify');
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../../middlewares/admin/auth');
const admin = require('../../../../middlewares/admin/admin');

// Validation
const validateSubCategoryInput = require('../../../../validations/admin/product/productSubCategory');

// Model
const ProductSubCategory = require('../../../../models/admin/product/productSubCategory');

// Helpers
const somethinError = require('../../../../helpers/something_error');

// @route  GET /api/admin/product/sub-categories
// @des    Get all product sub category
// @access Private
router.get('/', [auth, admin], (req, res) => {

  ProductSubCategory.find()
    .populate('category', ['_id','name'])
    .sort({ name: 1 })
    .then(subCats => {
      // No category found
      if (!subCats) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'subCategories': subCats });
    })
    .catch(err => somethinError(res, err));
});

// @route  GET /api/admin/product/sub-categories/:id
// @des    Get product sub category by id
// @access Private
router.get('/:id', [auth, admin], (req, res) => {

  ProductSubCategory.findById(req.params.id)
    .populate('category',  ['_id', 'name'])
    .then(subCat => {
      // No category found
      if (!subCat) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'subCategory': subCat });
    })
    .catch(err => somethinError(res, err));
});

// @route  POST /api/admin/product/sub-categories
// @des    Create product sub category
// @access Private
router.post('/', [auth, admin], (req, res) => {
  const { errors } = validateSubCategoryInput(req.body);
  if (errors) return res.status(400).json(errors);

  let subCatName = (req.body.name).toLowerCase();
  // Check sub category already exist or not
  ProductSubCategory.findOne({ name: subCatName })
    .then(cat => {
      if (cat) {
        return res.status(409).json({ name: "Sub Category already exist!" });
      } else {
        // Create new sub category
        const newSubCategory = new ProductSubCategory({
          category: req.body.category,
          name: subCatName,
          slug: slugify(subCatName)
        });
        // Save to DB
        newSubCategory.save()
          .then(subCat => {
            // Return sub category with category details
            ProductSubCategory.findById(subCat._id)
              .populate('category')
              .then(subCat=>{
                res.status(201).json({ success: true, subCategory: subCat })
              })
              .catch(err => somethinError(res));
          })
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  PUT /api/admin/product/sub-categories/:id
// @des    Update product sub category by id
// @access Private
router.put('/:id', [auth, admin], (req, res) => {
  const { errors } = validateSubCategoryInput(req.body);
  if (errors) return res.status(400).json(errors);

  let subCatName = (req.body.name).toLowerCase();
  // Check category exist or not
  ProductSubCategory.findById(req.params.id)
    .then(subCat => {
      if (!subCat) {
        return res.status(404).json({ error: "Sub Category Not Found!" });
      } else {
        // Update sub category
        subCat.category = req.body.category;
        subCat.name = subCatName;
        subCat.slug = slugify(subCatName);
        // Save to DB
        subCat.save()
          .then(subCat => {
            // Return sub category with category details
            ProductSubCategory.findById(subCat._id)
              .populate('category')
              .then(subCat=>{
                res.status(201).json({ success: true, subCategory: subCat })
              })
              .catch(err => somethinError(res));
          })
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  DELETE /api/admin/product/sub-categories/:id
// @des    Delete product sub category by id
// @access Private
router.delete('/:id', [auth, admin], (req, res) => {
  // Check sub category exist or not
  ProductSubCategory.findById(req.params.id)
    .then(subCat => {
      if (!subCat) {
        return res.status(404).json({ error: "Sub Category Not Found!" });
      } else {
        // Delete sub category
        subCat.delete()
          .then(subCat => res.status(200).json({ success: true, subCategory: subCat }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

module.exports = router;