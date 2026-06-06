const { Product } = require('../../models');

exports.postOrder = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    if (products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await req.user.createOrder();

    await order.addProducts(
      products.map((product) => {
        product.orderItem = {
          quantity: product.cartItem.quantity,
        };

        return product;
      }),
    );

    await cart.setProducts([]);

    return res.status(201).json({ message: 'Order created' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({
      include: [Product],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
