const express = require('express');
const router = express.Router();

// Models
const SubCategory = require('../../../../models/admin/product/productSubCategory');
const Product = require('../../../../models/admin/product/product');

// Helpers
const { noDataFound, somethingError } = require('../../../../helpers/errors_response');

// @route  GET /api/product/sub-categories
// @des    Get all sub category
// @access Public
router.get('/', (req, res) => {
  SubCategory.find()
    .then(subCategories => {
      if (!subCategories) return noDataFound(res);
      return res.status(200).json({
        success: true,
        subCategories: subCategories
      })
    })
    .catch(err => somethingError(res, err));
});

// @route  GET /api/product/sub-categories/:slug/products
// @des    Get all products belongs to this sub category
// @access Public
router.get('/:slug/products', (req, res) => {
  SubCategory.find({ slug: req.params.slug })
    .then(scat => {
      if (!scat || scat.length < 1) return noDataFound(res);
      // Get product belongs to this sub category
      Product.find({ subCategory: scat[0]._id })
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