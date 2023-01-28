const auth = require('./auth');



module.exports = {
  authenticateToken: auth.authenticateToken,
  generateAccessToken: auth.generateAccessToken,
   
  };