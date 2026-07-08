const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
    sendMessage,
    getMessages
} = require("../controllers/chat.controller");

// ==============================
// SEND MESSAGE
// POST /api/chat
// ==============================
router.post("/", protect, sendMessage);

// ==============================
// GET CHAT WITH FRIEND
// GET /api/chat/:id
// ==============================
router.get("/:id", protect, getMessages);

module.exports = router;