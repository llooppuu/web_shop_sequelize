const { Product } = require('../../models');

exports.postAddProduct = async (req, res) => {
  const { title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.create({
      title,
      price,
      imageUrl,
      description,
      userId: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postEditProduct = async (req, res) => {
  const { title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.query.edit !== 'true') {
      return res.status(403).json({ message: 'Editing is not allowed' });
    }

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    return res.json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
