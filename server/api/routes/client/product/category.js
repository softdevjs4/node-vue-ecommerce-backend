const express = require('express');
const router = express.Router();

// Models
const Category = require('../../../../models/admin/product/productCategory');
const Product = require('../../../../models/admin/product/product');

// Helpers
const { noDataFound, somethingError } = require('../../../../helpers/errors_response');

// @route  GET /api/product/categories
// @des    Get all category
// @access Public
router.get('/', (req, res) => {
  Category.find()
    .then(categories => {
      if (!categories) return noDataFound(res);
      return res.status(200).json({
        success: true,
        categories: categories
      })
    })
    .catch(err => somethingError(res, err));
});

// @route  GET /api/product/categories/:slug/products
// @des    Get all products belongs to this category
// @access Public
router.get('/:slug/products', (req, res) => {
  Category.find({ slug: req.params.slug })
    .then(cat => {
      if (!cat || cat.length < 1) return noDataFound(res);
      // Get product belongs to this category
      Product.find({ category: cat[0]._id })
        .populate('category')
        .populate('subCategory')
        .then(products => {
          if (!products || products.length < 1) return noDataFound(res);

          return res.status(200).json({
            success: true,
            products: products
          })
        })
        .catch(err => somethingError(res, err));
    })
    .catch(err => somethingError(res, err));
});

module.exports = router;