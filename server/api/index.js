const auth = require('./routes/auth');

module.exports = (app)=>{
  // User auth
  app.use('/api', auth);
}
