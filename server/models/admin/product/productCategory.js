const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 200 },
  slug: { type: String, required: true, minlength: 2 },
  created_at: {type: Date, default: Date.now()}
});

const ProductCategory = mongoose.model('ProductCategory', categorySchema);

module.exports = ProductCategory;