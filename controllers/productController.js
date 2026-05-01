const Product = require("../models/Product");

// GET /api/products - fetch all products from the database
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// GET /api/products/:id - fetch a single product by its ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    // Handle invalid MongoDB ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({ message: "Server error while fetching product" });
  }
};

module.exports = { getProducts, getProductById };
