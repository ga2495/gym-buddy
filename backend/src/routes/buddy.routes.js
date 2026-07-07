const express = require("express");
const router = express.Router();
console.log("✅ buddy.routes.js loaded");
const protect = require("../middleware/auth");

const {
    getBuddySuggestions
} = require("../controllers/buddy.controller");

// ====================================
// GET BUDDY SUGGESTIONS
// ====================================

router.get("/", protect, getBuddySuggestions);

module.exports = router;