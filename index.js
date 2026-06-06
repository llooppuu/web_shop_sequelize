const express = require('express');
const { sequelize } = require('./models');
const adminProductsRoutes = require('./routes/admin/products');
const shopProductsRoutes = require('./routes/shop/products');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminProductsRoutes);
app.use(shopProductsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Web shop Sequelize application is running' });
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
