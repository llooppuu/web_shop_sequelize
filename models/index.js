const sequelize = require('../config/database');

const Product = require('./product');
const User = require('./user');

User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

const db = {
  sequelize,
  Product,
  User,
};

module.exports = db;
