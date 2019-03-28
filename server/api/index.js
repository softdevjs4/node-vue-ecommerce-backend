const auth = require('./routes/admin/auth');
const productCategory = require('./routes/admin/product/productCategory');
const productSubCategory = require('./routes/admin/product/productSubCategory');
const optionGroup = require('./routes/admin/product/optionGroup');

module.exports = (app)=>{
  // All admin routes
  // Admin auth
  app.use('/api/admin', auth);
  // Product category
  app.use('/api/admin/product/categories', productCategory);
  // Product sub category
  app.use('/api/admin/product/sub-categories', productSubCategory);
  // Option group
  app.use('/api/admin/product/option-groups', optionGroup);
}
