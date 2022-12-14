const auth = require('./routes/admin/auth');
const productCategory = require('./routes/admin/product/productCategory');
const productSubCategory = require('./routes/admin/product/productSubCategory');
const optionGroup = require('./routes/admin/product/optionGroup');
const option = require('./routes/admin/product/option');
const productMfr = require('./routes/admin/product/productManufacturer');
const product = require('./routes/admin/product/product');
// Client route data
const clientAuth = require('./routes/client/auth');
const clientProductCategory = require('./routes/client/product/category');
const clientProductSubCategory = require('./routes/client/product/subCategory');
const clientProduct = require('./routes/client/product/product');
const order = require('./routes/client/order/order');

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
  // Option
  app.use('/api/admin/product/options', option);
  // Manufacturer
  app.use('/api/admin/product/manufacturers', productMfr);
  // Product
  app.use('/api/admin/product/products', product);

  // All client route
  // Customer auth
  app.use('/api', clientAuth);
  // Category
  app.use('/api/product/categories', clientProductCategory);
  // Sub category
  app.use('/api/product/sub-categories', clientProductSubCategory);
  // Product
  app.use('/api/product/products', clientProduct);
  // order
  app.use('/api/product/', order);
}
