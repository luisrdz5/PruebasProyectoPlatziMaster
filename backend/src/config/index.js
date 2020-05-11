require('dotenv').config();

const config = {
  production: process.env.ENV_DEV || false,
  port: process.env.PORT || 3000,
  mysql: {
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    database: process.env.DB_NAME || "",
  },
  mysql_dev: {
    user: process.env.DB_USER_DEV || "root",
    password: process.env.DB_PASSWORD_DEV || "",
    host: process.env.DB_HOST_DEV || "localhost",
    database: process.env.DB_NAME_DEV || "ecommerce-tuestilo",
  }
};

module.exports = config;