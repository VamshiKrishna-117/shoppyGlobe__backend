const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Test route to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "ShoppyGlobe API is running" });
});

// Import routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Register routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);        // Phase 4

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
