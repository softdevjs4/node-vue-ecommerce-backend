const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 200 },
  slug: { type: String, required: true, minlength: 2 },
  url: { type: String, minlength: 2 },
  image: { type: Object },
  created_at: { type: Date, default: Date.now() }
});

const ProductManufacturer = mongoose.model('ProductManufacturer', manufacturerSchema);

module.exports = ProductManufacturer;