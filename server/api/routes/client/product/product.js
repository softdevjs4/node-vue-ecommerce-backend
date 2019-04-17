const express = require('express');
const router = express.Router();

// Models
const Product = require('../../../../models/admin/product/product');

// Helpers
const { noDataFound, somethingError } = require('../../../../helpers/errors_response');

// @route  GET /api/product/products
// @des    Get all products
// @access Public
router.get('/', (req, res) => {
  // Pagination
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 20;
  const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;

  Product.find()
    .skip((pageNumber  - 1) * perPage)
    .limit(perPage)
    .populate('category')
    .populate('subCategory')
    .then(products => {
      if (!products) return noDataFound(res);
      return res.status(200).json({
        success: true,
        totoalProduct: products.length,
        products: products
      })
    })
    .catch(err => somethingError(res, err));
});

// @route  GET /api/product/products/:slug
// @des    Get product by slug
// @access Public
router.get('/:slug', (req, res) => {
   Product.find({slug: req.params.slug})
    .limit(1)
    .populate('category')
    .populate('subCategory')
    .then(product => {
      if (!product) return noDataFound(res);
      return res.status(200).json({
        success: true,
        product: product
      })
    })
    .catch(err => somethingError(res, err));
});

module.exports = router;