const { Product } = require('../../models');

exports.getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postCart = async (req, res) => {
  const productId = req.body.productId;
  let newQuantity = 1;

  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });
    let product = products[0];

    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    } else {
      product = await Product.findByPk(productId);
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await cart.addProduct(product, { through: { quantity: newQuantity } });

    return res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postDeleteCartProduct = async (req, res) => {
  const productId = req.body.productId;

  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });
    const product = products[0];

    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const quantity = product.cartItem.quantity;

    if (quantity > 1) {
      await cart.addProduct(product, { through: { quantity: quantity - 1 } });
    } else {
      await product.cartItem.destroy();
    }

    return res.json({ message: 'Product removed from cart' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
