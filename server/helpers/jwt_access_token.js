const config = require('config');
const jwt = require('jsonwebtoken');

module.exports.generateJwtToken = (payload, callback) => {
  // Sign jwt
  jwt.sign(
    payload,
    config.get('jwt.secretOrKey'),
    { expiresIn: config.get('jwt.tokenExpireIn') },
    (err, token) => {
      if (token) {
        callback(token);
      } else {
        return false;
      }
    }
  );
}