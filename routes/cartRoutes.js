const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { validateCartInput, validateCartUpdate } = require("../middlewares/validateInput");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

// All cart routes are protected - user must be logged in
// Validation middleware runs before the controller

// GET /api/cart - get all items in the user's cart
router.get("/", authMiddleware, getCart);

// POST /api/cart - add a product to the cart
router.post("/", authMiddleware, validateCartInput, addToCart);

// PUT /api/cart/:id - update quantity of a cart item
router.put("/:id", authMiddleware, validateCartUpdate, updateCartItem);

// DELETE /api/cart/:id - remove a product from the cart
router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;
