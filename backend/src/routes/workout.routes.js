const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const {
    addWorkout,
    getMyWorkouts,
    deleteWorkout
} = require("../controllers/workout.controller");

// ===============================
// ADD WORKOUT
// POST /api/workout
// ===============================
router.post("/", protect, addWorkout);

// ===============================
// GET MY WORKOUTS
// GET /api/workout
// ===============================
router.get("/", protect, getMyWorkouts);

// ===============================
// DELETE WORKOUT
// DELETE /api/workout/:id
// ===============================
router.delete("/:id", protect, deleteWorkout);

module.exports = router;