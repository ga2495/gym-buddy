const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
    sendMessage,
    getConversation
} = require("../controllers/chat.controller");

// =======================================
// SEND MESSAGE
// POST /api/chat/send/:id
// =======================================

router.post(
    "/send/:id",
    protect,
    sendMessage
);

// =======================================
// GET CONVERSATION
// GET /api/chat/:id
// =======================================

router.get(
    "/:id",
    protect,
    getConversation
);

module.exports = router;