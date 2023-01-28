const { mysql } = require('../config/var');
const knex = require('knex')({
  client: 'mysql',
  connection: mysql
});

const bookshelf = require('bookshelf')(knex);


// Defining User models
const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true
  });


  module.exports = {
    User: User,
  };