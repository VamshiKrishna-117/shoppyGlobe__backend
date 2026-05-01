const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes - verifies JWT token
// Only logged-in users with a valid token can access protected routes
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from the Authorization header
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, access denied" });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from the token payload and attach to request
    // Exclude password from the user object for security
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found, token invalid" });
    }

    next(); // token is valid, proceed to the route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
