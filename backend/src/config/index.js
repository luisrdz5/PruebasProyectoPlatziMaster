require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mysql: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    flags: process.env.DB_FLAGS
  },
  sslcert:{
    SSL_CA: process.env.SSL_CA,
    SSL_CERT: process.env.SSL_CERT,
    SSL_KEY: process.env.SSL_KEY
  }
};

module.exports = config;