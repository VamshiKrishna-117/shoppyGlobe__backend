const express = require("express");
const router = express.Router();
const { validateRegister } = require("../middlewares/validateInput");
const { registerUser, loginUser } = require("../controllers/authController");

// POST /api/auth/register - register a new user (with validation)
router.post("/register", validateRegister, registerUser);

// POST /api/auth/login - login and get JWT token
router.post("/login", loginUser);

module.exports = router;
