const express = require('express');
const router = express.Router();
const config = require('config');
const stripe = require('stripe')(config.get('stripe.secretKey'));

// Models
const Product = require('../../../../models/admin/product/product');

// Helpers
const { noDataFound, somethingError } = require('../../../../helpers/errors_response');

// @route  POST /api/product/checkout
// @des    Checkout product
// @access Privte
router.post('/checkout', (req, res) => {
  // Extract product id
  let productIds = [];
  req.body.products.map(item => {
    productIds.push(item.productId);
  })
  // Get all the ordered product
  Product.find({
    _id: {
      $in: productIds
    }
  }).then(products => {
    // Total price
    let total = 0;
    // Calculate total amount
    products.map(product => {
      // Get product quantity
      let filterProduct = req.body.products.filter(item => item.productId == product._id);
      let quantity = filterProduct[0].quantity;
      
      if (product.isFlashSale) {
        total += quantity * product.flashSale.flashPrice;
      } else {
        total += quantity * product.price;
      }
    });

    // Create the charge object with data from the Vue.js client
    var newCharge = {
      amount: total*100,
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js on the client side
    };
  
    // Call the stripe objects helper functions to trigger a new charge
    stripe.charges.create(newCharge, function (err, charge) {
      // send response
      if (err) {
        console.error(err);
        res.json({ error: err, charge: false });
      } else {

        // TODO : pass data to order table

        // send response with charge data
        res.json({ success: true, charge: charge });
      }
    });
  })
  
});



module.exports = router;