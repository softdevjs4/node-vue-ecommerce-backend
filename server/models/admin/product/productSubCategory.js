const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  name: { type: String, required: true, minlength: 2, maxlength: 200 },
  slug: { type: String, required: true, minlength: 2 },
  created_at: { type: Date, default: Date.now() }
});

const ProductSubCategory = mongoose.model('ProductSubCategory', subCategorySchema);

module.exports = ProductSubCategory;