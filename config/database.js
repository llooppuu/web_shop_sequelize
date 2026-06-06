const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('web_shop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
