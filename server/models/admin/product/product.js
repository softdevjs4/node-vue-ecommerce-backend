const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  sku: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "ProductCategory",
    required: true
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "ProductSubCategory",
    required: true
  },
  manufacturer: {
    _id: String,
    name: String,
    image: String
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 400,
    required: true
  },
  slug: {
    type: String,
    minlength: 2,
    maxlength: 500,
    required: true,
  },
  model: {
    type: String,
    minlength: 2,
    maxlength: 200
  },
  weight: Number,
  sortDesc: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true
  },
  longDesc: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true // Default product in stock
  },
  isFeature: {
    type: Boolean,
    default: false // Default not a feature product
  },
  status: {
    type: Boolean,
    required: true,
    default: true // Default active
  },
  isFlashSale: {
    type: Boolean,
    default: false
  },
  flashSale: Object,
  isSpecialSale: {
    type: Boolean,
    default: false
  },
  specialSale: Object,
  attributes: Array,
  thumb: {
    type: Object,
    required: true
  },
  images: Array,
  created_at: {
    type: Date,
    default: Date.now()
  },
  modified_at: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;