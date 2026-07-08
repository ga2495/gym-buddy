const pool = require("../config/db");

// ======================================
// GET BUDDY SUGGESTIONS
// ======================================

const getBuddySuggestions = async (req, res) => {

    try {

        const currentUser = await pool.query(
            `
            SELECT *
            FROM users
            WHERE id=$1
            `,
            [req.userId]
        );

        if (currentUser.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        const user = currentUser.rows[0];

        const buddies = await pool.query(
            `
            SELECT
                id,
                full_name,
                age,
                gender,
                city,
                gym_name,
                fitness_goal,
                experience,
                workout_time,
                bio,

                (
                    CASE WHEN city=$1 THEN 20 ELSE 0 END +
                    CASE WHEN gym_name=$2 THEN 20 ELSE 0 END +
                    CASE WHEN fitness_goal=$3 THEN 20 ELSE 0 END +
                    CASE WHEN experience=$4 THEN 20 ELSE 0 END +
                    CASE WHEN workout_time=$5 THEN 20 ELSE 0 END
                ) AS match_score

            FROM users

            WHERE id <> $6

            AND id NOT IN (

                SELECT receiver_id
                FROM friend_requests
                WHERE sender_id=$6
                AND status='pending'

                UNION

                SELECT sender_id
                FROM friend_requests
                WHERE receiver_id=$6
                AND status='pending'

                UNION

                SELECT user1_id
                FROM friendships
                WHERE user2_id=$6

                UNION

                SELECT user2_id
                FROM friendships
                WHERE user1_id=$6

            )

            ORDER BY
            match_score DESC,
            full_name ASC
            `,
            [
                user.city,
                user.gym_name,
                user.fitness_goal,
                user.experience,
                user.workout_time,
                req.userId
            ]
        );

        res.json({
            success: true,
            total: buddies.rows.length,
            buddies: buddies.rows
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
    getBuddySuggestions
};