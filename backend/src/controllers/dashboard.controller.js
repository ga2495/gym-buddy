const pool = require("../config/db");

const getDashboard = async (req, res) => {

    try {

        const userId = req.userId;

        const friends = await pool.query(
            `
            SELECT COUNT(*)
            FROM friendships
            WHERE user1_id=$1
            OR user2_id=$1
            `,
            [userId]
        );

        const requests = await pool.query(
            `
            SELECT COUNT(*)
            FROM friend_requests
            WHERE receiver_id=$1
            AND status='pending'
            `,
            [userId]
        );

        const workouts = await pool.query(
            `
            SELECT COUNT(*)
            FROM workout_plans
            WHERE user_id=$1
            `,
            [userId]
        );

        const messages = await pool.query(
            `
            SELECT COUNT(*)
            FROM messages
            WHERE sender_id=$1
            OR receiver_id=$1
            `,
            [userId]
        );

        res.json({

            success: true,

            friends: Number(friends.rows[0].count),

            pendingRequests: Number(requests.rows[0].count),

            workouts: Number(workouts.rows[0].count),

            messages: Number(messages.rows[0].count)

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
    getDashboard
};