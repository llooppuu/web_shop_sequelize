const express = require('express');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Web shop Sequelize application is running' });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
