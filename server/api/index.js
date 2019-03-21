const auth = require('./routes/admin/auth');

module.exports = (app)=>{
  // All admin routes
  app.use('/api/admin', auth);
}
