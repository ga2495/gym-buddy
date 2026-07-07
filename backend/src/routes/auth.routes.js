const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// =========================
// PROTECTED ROUTES
// =========================

// Get Logged In User
router.get("/profile", protect, profile);

module.exports = router;