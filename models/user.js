const models = require('./models');

//Check unique email for user
function findUserByEmail(email){
    new models.User({ email:email}).fetch().then(resData => {
      console.log('22222222222222222222222',resData.attributes.id);
      return resData.attributes.id;
    }).catch((error)=>{
        console.error(error);
    });
}




module.exports = {
    findUserByEmail: findUserByEmail,
  };