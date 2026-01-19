const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.userId });
  res.json(products);
};

exports.addProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.userId
  });
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.userId },
    req.body,
    { new: true }
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.userId
  });
  res.json({ message: 'Product deleted' });
};
