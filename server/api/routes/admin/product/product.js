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
    .populate('category')
    .populate('subCategory')
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

// @route  GET /api/admin/product/products/:id/attributes
// @des    Get product attributes
// @access Private
router.get('/:id/attributes', [auth, admin], (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) return res.status(404).json({
        success: false,
        error: 'No data found!'
      })
      return res.json({
        success: true,
        attributes: product.attributes
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
            'attributes',
          ])
        )
        // Embided Manufacturer
        if (req.body.hasManufacturer) {
          newProduct.manufacturer = {
            _id: req.body.manufacturerId,
            name: req.body.manufacturerName,
            image: req.body.manufacturerImage
          }
        }
        // If flash Sale
        if (req.body.isFlashSale) {
          newProduct.isFlashSale = true;
          newProduct.flashSale = {
            flashPrice: req.body.flashPrice,
            flashStart: req.body.flashStart,
            flashEnd: req.body.flashEnd,
            flashStatus: req.body.flashStatus
          }
        }

        // If special sell
        if (req.body.isSpecialSale) {
          newProduct.isSpecialSale = true;
          newProduct.specialSale = {
            specialPrice: req.body.specialPrice,
            specialExpire: req.body.specialExpire,
            specialStatus: req.body.specialStatus
          }
        }

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
          if (product.thumb) {
            const result = deleteServerImage(product.thumb.id);
            if (result) console.log(result);
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
    .catch(err => somethinError(res, err));
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
        if (product.thumb) {
          const result = deleteServerImage(product.thumb.id);
          if (result) console.log(result);
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

// @route  POST /api/admin/product/products/:id/attributes
// @des    Add product attribute
// @access Private
router.post('/:id/attributes', [auth, admin], (req, res) => {
  // Check exist or not
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          name: 'Product not found!'
        })
      } else {
        let newGroup = true;
        // Add product attribute
        if(product.attributes){
          if(!product.attributes.length){
            // If product have no attribute
            let attribute = {
              optionGroupId: req.body.optionGroup._id,
              optionGroupName: req.body.optionGroup.name,
              options: [req.body.option]
            }
            product.attributes.push(attribute);
          }else{
            // Already have some attribute  
            product.attributes = product.attributes.map(element => {
              // Chack new attribute group already have in db
              if(element.optionGroupId === req.body.optionGroup._id){
                element.options.push(req.body.option)
                newGroup = false;
                return element;
              }else{
                return element;
              }
            });
            // Notify mongooose the dataset has changed
            product.markModified('attributes');
            // If this group not in db create a new
            if(newGroup){
              let attribute = {
                optionGroupId: req.body.optionGroup._id,
                optionGroupName: req.body.optionGroup.name,
                options: [req.body.option]
              }
              product.attributes.push(attribute);
            }
          }
        }

        // Update product attribute
        product.save()
        .then(result => res.status(200).json({
          success: true,
          attributes: result.attributes
        }))
        .catch(err => somethinError(res, err));
      }
    })
    .catch(err => somethinError(res, err));
});

// @route  DELETE /api/admin/product/products/:id/attributes/:attId
// @des    Delete product attribute
// @access Private
router.delete('/:id/attributes/:attId', [auth, admin], (req, res) => {
  // Check exist or not
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found!'
        })
      } else {
        // Find delete index
        const deleteIndex = product.attributes.map(att => att.optionGroupId ).indexOf(req.params.attId);
        // Delete attribute
        product.attributes.splice(deleteIndex, 1);
      }
      
      // Update product attribute
      product.save()
      .then(result => res.status(200).json({
        success: true,
        attributes: result.attributes
      }))
      .catch(err => somethinError(res, err));
    })
    .catch(err => somethinError(res, err));
});

module.exports = router;