const slugify = require('slugify');
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../../middlewares/admin/auth');
const admin = require('../../../../middlewares/admin/admin');

// Validation
const validateCategoryInput = require('../../../../validations/admin/product/productCategory');

// Model
const ProductCategory = require('../../../../models/admin/product/productCategory');

// Helpers
const somethinError = require('../../../../helpers/something_error');

// @route  GET /api/admin/product/categories
// @des    Get all product category
// @access Private
router.get('/', [auth, admin], (req, res) => {

  ProductCategory.find()
    .sort({ name: 1 })
    .then(cats => {
      // No category found
      if (!cats) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'categories': cats });
    })
    .catch(err => somethinError(res, err));
});

// @route  GET /api/admin/product/categories/:id
// @des    Get product category by id
// @access Private
router.get('/:id', [auth, admin], (req, res) => {

  ProductCategory.findById(req.params.id)
    .then(cat => {
      // No category found
      if (!cat) return res.status(404).json({ success: false, error: 'No data found!' });

      return res.status(200).json({ success: true, 'category': cat });
    })
    .catch(err => somethinError(res, err));
});

// @route  POST /api/admin/product/categories
// @des    Create product category
// @access Private
router.post('/', [auth, admin], (req, res) => {
  const { errors } = validateCategoryInput(req.body);
  if (errors) return res.status(400).json(errors);

  let catName = (req.body.name).toLowerCase();
  // Check category already exist or not
  ProductCategory.findOne({ name: catName })
    .then(cat => {
      if (cat) {
        return res.status(409).json({ name: "Category already exist!" });
      } else {
        // Create new category
        const newCategory = new ProductCategory({
          name: catName,
          slug: slugify(catName)
        });
        // Save to DB
        newCategory.save()
          .then(cat => res.status(201).json({ success: true, category: cat }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  PUT /api/admin/product/categories/:id
// @des    Update product category by id
// @access Private
router.put('/:id', [auth, admin], (req, res) => {
  const { errors } = validateCategoryInput(req.body);
  if (errors) return res.status(400).json(errors);

  let catName = (req.body.name).toLowerCase();
  // Check category exist or not
  ProductCategory.findById(req.params.id)
    .then(cat => {
      if (!cat) {
        return res.status(404).json({ error: "Category Not Found!" });
      } else {
        // Update category
        cat.name = catName;
        cat.slug = slugify(catName);
        // Save to DB
        cat.save()
          .then(cat => res.status(200).json({ success: true, category: cat }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

// @route  DELETE /api/admin/product/categories/:id
// @des    Delete product category by id
// @access Private
router.delete('/:id', [auth, admin], (req, res) => {
  // Check category exist or not
  ProductCategory.findById(req.params.id)
    .then(cat => {
      if (!cat) {
        return res.status(404).json({ error: "Category Not Found!" });
      } else {
        // Delete category
        cat.delete()
          .then(cat => res.status(200).json({ success: true, category: cat }))
          .catch(err => somethinError(res));
      }
    })
    .catch(err => somethinError(res, err));

});

module.exports = router;