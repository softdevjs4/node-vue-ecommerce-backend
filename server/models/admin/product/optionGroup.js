const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionGroupSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 200 },
  slug: { type: String, required: true, minlength: 2 },
  created_at: {type: Date, default: Date.now()}
});

const OptionGroup = mongoose.model('OptionGroup', optionGroupSchema);

module.exports = OptionGroup;