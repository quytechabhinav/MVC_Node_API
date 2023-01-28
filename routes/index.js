const express = require('express');
const app = express();

const user = require('../controller/users');



app.use('/users', user);




module.exports = app;
