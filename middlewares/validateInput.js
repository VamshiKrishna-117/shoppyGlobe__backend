// Input validation middleware for cart operations
// Validates request body before the controller processes it

// Validate add-to-cart request
const validateCartInput = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Check if productId is a valid MongoDB ObjectId format (24 hex characters)
  if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  if (quantity !== undefined && (typeof quantity !== "number" || quantity < 1)) {
    return res.status(400).json({ message: "Quantity must be a number and at least 1" });
  }

  next();
};

// Validate update cart quantity request
const validateCartUpdate = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: "Quantity is required" });
  }

  if (typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be a number and at least 1" });
  }

  next();
};

// Validate registration input
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  next();
};

module.exports = { validateCartInput, validateCartUpdate, validateRegister };
