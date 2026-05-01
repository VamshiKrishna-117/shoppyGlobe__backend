const Cart = require("../models/Cart");
const Product = require("../models/Product");

// POST /api/cart - add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product is in stock
    if (product.stockQuantity < (quantity || 1)) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Check if this product is already in the user's cart
    const existingItem = await Cart.findOne({
      userId: req.user._id,
      productId,
    });

    if (existingItem) {
      // If already in cart, increase the quantity
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.json({ message: "Cart updated", cartItem: existingItem });
    }

    // Add new item to cart
    const cartItem = await Cart.create({
      userId: req.user._id,
      productId,
      quantity: quantity || 1,
    });

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// GET /api/cart - get all cart items for the logged-in user
const getCart = async (req, res) => {
  try {
    // Find all cart items for this user and populate product details
    const cartItems = await Cart.find({ userId: req.user._id }).populate(
      "productId",
      "name price description image"
    );

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

// PUT /api/cart/:id - update quantity of a cart item
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find the cart item and make sure it belongs to the logged-in user
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Check stock availability
    const product = await Product.findById(cartItem.productId);
    if (product && quantity > product.stockQuantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Cart item updated", cartItem });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid cart item ID format" });
    }
    res.status(500).json({ message: "Server error while updating cart" });
  }
};

// DELETE /api/cart/:id - remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    // Find and delete the cart item (only if it belongs to the logged-in user)
    const cartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid cart item ID format" });
    }
    res.status(500).json({ message: "Server error while removing from cart" });
  }
};

module.exports = { addToCart, getCart, updateCartItem, removeFromCart };
