const auth = require('./routes/admin/auth');

module.exports = (app)=>{
  // All admin routes
  // Admin auth
  app.use('/api/admin', auth);
}
