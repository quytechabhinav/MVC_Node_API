// to Implement .env file
const { mysql } = require('../config/var'); //can veriable of .env with donenv-safe

module.exports = {
  development: {
    client: 'mysql',
    timezone: 'UTC',
    connection: {
      host: mysql.host,
      database: mysql.database,
      user: mysql.user,
      password: mysql.password,
      timezone: 'UTC' 
    },

    migrations: {
      tableName: 'knex_migrations',
      directory: '../models/migrations'
    },
    seeds: {
      directory: '../models/seeds'
    }
  },
  staging: {
    client: 'mysql',
    timezone: 'UTC',
    connection: {
      host: mysql.host,
      database: mysql.database,
      user: mysql.user,
      password: mysql.password,
      timezone: 'UTC'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../models/migrations'
    },
    seeds: {
      directory: '../models/seeds'
    }
  },
  production: {
    client: 'mysql',
    timezone: 'UTC',
    connection: {
      host: mysql.host,
      database: mysql.database,
      user: mysql.user,
      password: mysql.password,
      timezone: 'UTC'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../models/migrations'
    },
    seeds: {
      directory: '../models/seeds'
    }
  }
};