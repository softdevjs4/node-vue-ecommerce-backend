const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, minlength: 5, maxlength: 255 },
  password: { type: String, required: true, minlength: 6, maxlength: 255 },
  isAdmin: { type: Boolean, default: true },
  status: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;