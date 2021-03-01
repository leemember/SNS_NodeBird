const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'dbmasteruser',
    password: process.env.DB_PASSWORD,
    database: 'leehyunju',
    host: 'ls-5e1f6dc6cda34ee3ff0a83dddc17e6772c6fe068.cpd3bfmvavpa.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  test: {
    username: 'dbmasteruser',
    password: process.env.DB_PASSWORD,
    database: 'leehyunju',
    host: 'ls-5e1f6dc6cda34ee3ff0a83dddc17e6772c6fe068.cpd3bfmvavpa.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  production: {
    username: 'dbmasteruser',
    password: process.env.DB_PASSWORD,
    database: 'leehyunju',
    host: 'ls-5e1f6dc6cda34ee3ff0a83dddc17e6772c6fe068.cpd3bfmvavpa.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
};