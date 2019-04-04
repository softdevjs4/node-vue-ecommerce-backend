const slugify = require('slugify');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../../../../middlewares/admin/auth');
const admin = require('../../../../middlewares/admin/admin');

// Validation
const validateProductInput = require('../../../../validations/admin/product/product');

// Model
const Product = require('../../../../models/admin/product/product');

// Helpers
const somethinError = require('../../../../helpers/something_error');
// Image upload
const {
  multerParser
} = require('../../../../utils/cloudinary');
// Delete image
const {
  deleteServerImage
} = require('../../../../utils/cloudinary');

// @route  GET /api/admin/product/products
// @des    Get all products
// @access Private
router.get('/', [auth, admin], (req, res) => {
  Product.find()
    .then(products => {
      if (!products) return res.status(404).json({
        success: false,
        error: 'No data found!'
      })
      return res.json({
        success: true,
        products: products
      });
    })
    .catch(err => somethinError(res, err));
});
// @route  GET /api/admin/product/products/:id
// @des    Get product by id
// @access Private
router.get('/:id', [auth, admin], (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) return res.status(404).json({
        success: false,
        error: 'No data found!'
      })
      return res.json({
        success: true,
        product: product
      });
    })
    .catch(err => somethinError(res, err));
});

// @route  POST /api/admin/product/products
// @des    Create new product
// @access Private
router.post('/', [auth, admin, multerParser.single('thumb')], (req, res) => {
  const {
    errors
  } = validateProductInput(req.body);
  if (errors) return res.status(400).json(errors);

  // Product name
  const productName = (req.body.name).toLowerCase();
  // Check if product already exist
  Product.findOne({
      name: productName
    })
    .then(product => {
      if (product) {
        return res.status(409).json({
          name: 'Product already exist'
        })
      } else {
        // If new product
        const newProduct = new Product(
          // Extract from data to object
          _.pick(req.body, [
            'sku',
            'category',
            'subCategory',
            'manufacturer',
            'name',
            'model',
            'weight',
            'sortDesc',
            'lognDesc',
            'price',
            'stock',
            'inStock',
            'isFeaturer',
            'status',
            'flashSale',
            'specialSale',
            'attributes',
          ])
        )

        // Make name lowercase and make slug
        newProduct.name = productName;
        newProduct.slug = slugify(productName);

        // Set thumb data
        if (req.file) {
          newProduct.thumb = {
            id: req.file.public_id,
            url: req.file.url
          }
        }

        // Save to db
        newProduct.save()
          .then(result => res.status(201).json({
            success: true,
            product: result
          }))
          .catch(err => somethinError(res, err));
      }
    })
    .catch(err => somethinError(res, err));;
});

// @route  PUT /api/admin/product/products
// @des    Update product
// @access Private
router.put('/:id', [auth, admin, multerParser.single('thumb')], (req, res) => {
  const {
    errors
  } = validateProductInput(req.body);
  if (errors) return res.status(400).json(errors);

  // Product name
  const productName = (req.body.name).toLowerCase();
  // Check exist or not
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          name: 'Product not found!'
        })
      } else {
        // Update product
        product.set(
          // Extract from data to object
          _.pick(req.body, [
            'sku',
            'category',
            'subCategory',
            'manufacturer',
            'name',
            'model',
            'weight',
            'sortDesc',
            'lognDesc',
            'price',
            'stock',
            'inStock',
            'isFeaturer',
            'status',
            'flashSale',
            'specialSale',
            'attributes',
          ])
        )

        // Make name lowercase and make slug
        product.name = productName;
        product.slug = slugify(productName);

        // Set thumb data
        if (req.file) {
          // Delete old thumb from server
          if(product.thumb){
            const result = deleteServerImage(product.thumb.id);
            if(result) console.log(result);
          }
          product.thumb = {
            id: req.file.public_id,
            url: req.file.url
          }
        }

        // Save to db
        product.save()
          .then(result => res.status(201).json({
            success: true,
            product: result
          }))
          .catch(err => somethinError(res, err));
      }
    })
    .catch(err => somethinError(res, err));;
});
// @route  DELETE /api/admin/product/products/:id
// @des    Delete product by id
// @access Private
router.delete('/:id', [auth, admin], (req, res) => {
  // Check product exist or not
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          error: "Product Not Found!"
        });
      } else {
        // Delete old thumb from server
        if(product.thumb){
          const result = deleteServerImage(product.thumb.id);
          if(result) console.log(result);
        }
        // Delete product
        product.delete()
          .then(product => res.status(200).json({
            success: true,
            product: product
          }))
          .catch(err => somethinError(res, err));
      }
    })
    .catch(err => somethinError(res, err));

});


module.exports = router;