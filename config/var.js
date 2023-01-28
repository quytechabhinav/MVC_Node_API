const path = require('path');

// use .env file in knexfile so we create a var file and requried this in
//  knexfile dotenv-safe is use to store and allow acess in knexfile

require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mysql: {
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'utc'
  },
  aws: {
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    snsregion: process.env.AWS_SNS_REGION,
    bucketregion: process.env.AWS_BUCKET_REGION,
    bucket: process.env.AWS_BUCKET,
    smtpUser: process.env.AWS_SMTP_USER,
    smtpPassword: process.env.AWS_SMTP_PASSWORD
  },
  baseURL: process.env.API_URL,
  vueURL: process.env.VUE_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  google: {
    apiKey: process.env.GOOGLE_API_KEY
  }
};
