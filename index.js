const express = require('express');
const { sequelize, User } = require('./models');
const adminProductsRoutes = require('./routes/admin/products');
const shopProductsRoutes = require('./routes/shop/products');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Web shop Sequelize application is running' });
});

sequelize
  .sync({ force: true })
  .then(async () => {
    const user = await User.create({
      name: 'Dummy User',
      email: 'dummy@example.com',
    });

    app.use((req, res, next) => {
      req.user = user;
      next();
    });

    app.use('/admin', adminProductsRoutes);
    app.use(shopProductsRoutes);

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
