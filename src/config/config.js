const config = {
  "development": {
    "username": process.env.DEVELOPMENT_USERNAME,
    "password": process.env.DEVELOPMENT_PASSWORD,
    "database": process.env.DEVELOPMENT_DATABASE,
    "port": process.env.DEVELOPMENT_PORT,
    "host": process.env.DEVELOPMENT_HOST,
    "dialect": process.env.DEVELOPMENT_DIALECT
  },
  "test": {
    "username": process.env.TEST_USERNAME,
    "password": process.env.TEST_PASSWORD,
    "database": process.env.TEST_DATABASE,
    "host": process.env.TEST_HOST,
    "port": process.env.TEST_PORT,
    "dialect": process.env.TEST_DIALECT
  },
  "production": {
    "username": process.env.PRODUCTION_USERNAME,
    "password": process.env.PRODUCTION_PASSWORD,
    "database": process.env.PRODUCTION_DATABASE,
    "host": process.env.PRODUCTION_HOST,
    "dialect": process.env.PRODUCTION_DIALECT
  }
}

module.exports = config