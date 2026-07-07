const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
  getProfile,
  updateProfile
} = require("../controllers/profile.controller");

// ==========================
// GET MY PROFILE
// ==========================
router.get("/", protect, getProfile);

// ==========================
// UPDATE PROFILE
// ==========================
router.put("/", protect, updateProfile);

module.exports = router;