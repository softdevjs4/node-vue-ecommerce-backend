const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, minlength: 5, maxlength: 255 },
  password: { type: String, required: true, minlength: 6, maxlength: 255 },
  status: { type: Boolean, default: true }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;