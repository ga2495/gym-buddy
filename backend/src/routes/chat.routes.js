const express = require("express");
const router = express.Router();

console.log("✅ CHAT ROUTES REGISTERED");

const protect = require("../middleware/auth");

const {
    sendMessage,
    getMessages
} = require("../controllers/chat.controller");

router.post("/", protect, (req, res, next) => {
    console.log("POST /api/chat HIT");
    next();
}, sendMessage);

router.get("/:id", protect, (req, res, next) => {
    console.log("GET /api/chat/:id HIT");
    next();
}, getMessages);

module.exports = router;