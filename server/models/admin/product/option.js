const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  optionGroup: { type: Schema.Types.ObjectId, ref: "OptionGroup" },
  name: { type: String, required: true, minlength: 1, maxlength: 200 },
  other: { type: String, maxlength: 200 },
  note: { type: String, maxlength:200 },
  created_at: { type: Date, default: Date.now() }
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;