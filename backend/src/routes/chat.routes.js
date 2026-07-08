const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
    sendMessage,
    getMessages
} = require("../controllers/chat.controller");

// Send Message
router.post("/", protect, sendMessage);

// Get Messages
router.get("/:id", protect, getMessages);

module.exports = router;