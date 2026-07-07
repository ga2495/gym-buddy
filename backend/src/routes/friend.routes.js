const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
    sendFriendRequest,
    getPendingRequests,
    acceptRequest,
    getFriends
} = require("../controllers/friend.controller");

// ======================================
// SEND FRIEND REQUEST
// POST /api/friends/request/:id
// ======================================
router.post("/request/:id", protect, sendFriendRequest);

// ======================================
// GET PENDING REQUESTS
// GET /api/friends/requests
// ======================================
router.get("/requests", protect, getPendingRequests);

// ======================================
// ACCEPT FRIEND REQUEST
// PUT /api/friends/accept/:id
// ======================================
router.put("/accept/:id", protect, acceptRequest);

// ======================================
// GET FRIEND LIST
// GET /api/friends
// ======================================
router.get("/", protect, getFriends);

module.exports = router;