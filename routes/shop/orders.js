const express = require('express');

const ordersController = require('../../controllers/shop/orders');

const router = express.Router();

router.get('/orders', ordersController.getOrders);
router.post('/create-order', ordersController.postOrder);

module.exports = router;
