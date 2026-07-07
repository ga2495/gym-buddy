const pool = require("../config/db");

// ======================================
// ADD WORKOUT PLAN
// ======================================

const addWorkout = async (req, res) => {

    try {

        const {
            exercise_name,
            sets,
            reps,
            workout_day
        } = req.body;

        await pool.query(
            `
            INSERT INTO workout_plans
            (
                user_id,
                exercise_name,
                sets,
                reps,
                workout_day
            )
            VALUES($1,$2,$3,$4,$5)
            `,
            [
                req.userId,
                exercise_name,
                sets,
                reps,
                workout_day
            ]
        );

        res.json({
            success: true,
            message: "Workout Added Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ======================================
// GET MY WORKOUTS
// ======================================

const getMyWorkouts = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM workout_plans
            WHERE user_id=$1
            ORDER BY workout_day
            `,
            [req.userId]
        );

        res.json({
            success: true,
            workouts: result.rows
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ======================================
// DELETE WORKOUT
// ======================================

const deleteWorkout = async (req, res) => {

    try {

        await pool.query(
            `
            DELETE FROM workout_plans
            WHERE id=$1
            AND user_id=$2
            `,
            [
                req.params.id,
                req.userId
            ]
        );

        res.json({
            success: true,
            message: "Workout Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    addWorkout,
    getMyWorkouts,
    deleteWorkout
};