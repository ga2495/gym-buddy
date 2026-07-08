const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
    getDashboardStats
} = require("../controllers/dashboard.controller");

router.get("/", protect, getDashboardStats);

module.exports = router;