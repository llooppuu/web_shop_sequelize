const express = require('express');

const cartController = require('../../controllers/shop/cart');

const router = express.Router();

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.postCart);
router.post('/cart-delete-item', cartController.postDeleteCartProduct);

module.exports = router;
