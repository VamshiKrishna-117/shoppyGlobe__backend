// Seed script - run this once to populate the database with sample products
// Usage: node seeds/productSeeds.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

// Sample product data
const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    price: 999,
    description: "Latest Apple smartphone with A17 Pro chip and titanium design",
    stockQuantity: 50,
    category: "electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Samsung Galaxy S24",
    price: 799,
    description: "Samsung flagship phone with AI-powered features",
    stockQuantity: 40,
    category: "electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 349,
    description: "Industry-leading noise cancelling wireless headphones",
    stockQuantity: 100,
    category: "electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Nike Air Max 270",
    price: 150,
    description: "Comfortable running shoes with Max Air cushioning",
    stockQuantity: 200,
    category: "footwear",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Levi's 501 Original Jeans",
    price: 69,
    description: "Classic straight fit jeans with button fly",
    stockQuantity: 150,
    category: "clothing",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "MacBook Air M3",
    price: 1099,
    description: "Thin and light laptop with Apple M3 chip and 18-hour battery",
    stockQuantity: 30,
    category: "electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "The Alchemist - Book",
    price: 15,
    description: "Bestselling novel by Paulo Coelho about following your dreams",
    stockQuantity: 500,
    category: "books",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Yoga Mat Premium",
    price: 45,
    description: "Non-slip exercise mat with extra cushioning, 6mm thick",
    stockQuantity: 80,
    category: "fitness",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 25,
    description: "Insulated water bottle, keeps drinks cold for 24 hours",
    stockQuantity: 300,
    category: "accessories",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Logitech MX Master 3S Mouse",
    price: 99,
    description: "Ergonomic wireless mouse with quiet clicks and fast scrolling",
    stockQuantity: 75,
    category: "electronics",
    image: "https://via.placeholder.com/300",
  },
];

// Connect to MongoDB and insert sample data
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    // Clear existing products
    await Product.deleteMany();
    console.log("Existing products cleared.");

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`${inserted.length} products added successfully!`);

    // Disconnect after seeding
    await mongoose.disconnect();
    console.log("Seeding complete. Database disconnected.");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
