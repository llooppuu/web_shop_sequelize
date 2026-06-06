const express = require('express');

const shopProductsController = require('../../controllers/shop/products');

const router = express.Router();

router.get('/products', shopProductsController.getProducts);
router.get('/product/:productId', shopProductsController.getProduct);

module.exports = router;
