const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/productController");

// GET /api/products - get all products
router.get("/", getProducts);

// GET /api/products/:id - get a single product by ID
router.get("/:id", getProductById);

module.exports = router;
