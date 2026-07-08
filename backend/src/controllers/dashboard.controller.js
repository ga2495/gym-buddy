const pool = require("../config/db");

// =======================================
// DASHBOARD STATS
// =======================================

const getDashboardStats = async (req, res) => {

    try {

        const userId = req.userId;

        // Friends Count
        const friends = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM friendships
            WHERE
                user1_id=$1
                OR
                user2_id=$1
            `,
            [userId]
        );

        // Pending Friend Requests
        const pending = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM friend_requests
            WHERE
                receiver_id=$1
                AND status='pending'
            `,
            [userId]
        );

        // Workouts Count
        const workouts = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM workouts
            WHERE user_id=$1
            `,
            [userId]
        );

        // Messages Count
        let messages = 0;

        try {

            const msg = await pool.query(
                `
                SELECT COUNT(*) AS total
                FROM messages
                WHERE
                    sender_id=$1
                    OR
                    receiver_id=$1
                `,
                [userId]
            );

            messages = Number(msg.rows[0].total);

        } catch {

            messages = 0;

        }

        res.json({

            friends: Number(friends.rows[0].total),

            pendingRequests: Number(pending.rows[0].total),

            workouts: Number(workouts.rows[0].total),

            messages

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

    getDashboardStats

};