const error_code = require('../exception/error_code');
const jwt = require('jsonwebtoken');

const path = require('path');
require('dotenv-safe').config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  });

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(error_code.Unauthorized)

  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    console.log(err)
    if (err) {
        res.send({
            status: error_code.Forbidden,
            data: err,
          });  
    }
    req.data = decoded;
    next();
  }); 
}

//token generate
function generateAccessToken(user_id) {
    return jwt.sign(user_id, process.env.TOKEN_SECRET, { expiresIn: process.env.SESSION });
  }



module.exports = {
    authenticateToken: authenticateToken,
    generateAccessToken: generateAccessToken,
   
  };