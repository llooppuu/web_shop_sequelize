const express = require('express');

const adminProductsController = require('../../controllers/admin/products');

const router = express.Router();

router.get('/products', adminProductsController.getProducts);
router.get('/product/:productId', adminProductsController.getProduct);
router.post('/add-product', adminProductsController.postAddProduct);
router.post('/product/edit/:productId', adminProductsController.postEditProduct);
router.post('/product/delete/:productId', adminProductsController.postDeleteProduct);

module.exports = router;
