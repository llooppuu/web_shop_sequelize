const sequelize = require('../config/database');

const Product = require('./product');
const User = require('./user');
const Cart = require('./cart');
const CartItem = require('./cart-item');
const Order = require('./order');
const OrderItem = require('./order-items');

User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

const db = {
  sequelize,
  Product,
  User,
  Cart,
  CartItem,
  Order,
  OrderItem,
};

module.exports = db;
