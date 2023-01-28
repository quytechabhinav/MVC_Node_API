const models = require('../models');
const middleware = require('../middleware');
const error_code = require('../exception/error_code');
var express = require("express");
const router = express();
const { body, validationResult } = require('express-validator');

//for password generate using bcrypt, store hash in db
var bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
    res.send({
      message:"User Controllers run successfully!",
      data:process.versions
    });
  });

  /**signup API to store user data in database */

  router.post('/sign_up', 
  //check Validation
    body('email').notEmpty().isEmail().withMessage('email is invalid format').trim().escape(),
    body('firstname').isAlpha().isLength({ min: 5 }).withMessage('User name must be >5 latter'),
    body('phone').isNumeric().withMessage('Phone must be numeric value').trim().escape(),
    body('password').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }).withMessage('password must be numeric value').trim().escape(),
   
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //save data in user table
      const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); //bcrypt.hashSync(, 18);
      req.body.password = hashedPassword;
      new models.User(req.body).save()
      .then((resData) =>{
        const token = middleware.generateAccessToken({ user_id: resData.id });
        delete resData.attributes['password'];
        res.send({
          status: error_code.Created,
          data: resData,
          token: token
        });
      }).catch((error) => {
        return res.status(412).send({
          success: false,
          message: error.message
      });
    });
  }
  );

  router.post('/sign_in', function(req, res) {
    let params= req.body;
    new models.User({email: params.email}).fetch().then(resData => {
      var passwordIsValid = bcrypt.compareSync(req.body.password, resData.attributes.password);
      if (!passwordIsValid) return res.send({
        status: error_code.Unauthorized, 
         token: null 
        }); 
        delete resData.attributes['password'];

      const token = middleware.generateAccessToken({ user_id: resData.attributes.id });
      res.send({ 
        status: error_code.Ok, 
        data: resData.attributes, 
        token: token 
      });
    }).catch((error)=>{
      res.send({ 
        status: error_code.Unauthorized, 
        data: error, 
        token: null 
      });
    });  
  });

  router.get('/get_users', middleware.authenticateToken, (req, res) => {
    console.log('We are successfully authorize and get all data logic');
    return res.send({
      status: error_code.Ok,
      message: 'We are successfully authorize and get all data logic',
      data: req.data
  });
  });

module.exports = router;
