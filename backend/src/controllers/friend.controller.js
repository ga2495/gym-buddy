const pool = require("../config/db");

// =======================================
// SEND FRIEND REQUEST
// =======================================

const sendFriendRequest = async (req, res) => {
    try {

        const senderId = req.userId;
        const receiverId = Number(req.params.id);

        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send request to yourself."
            });
        }

        // Check receiver exists
        const receiver = await pool.query(
            "SELECT id FROM users WHERE id=$1",
            [receiverId]
        );

        if (receiver.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Already friends
        const alreadyFriends = await pool.query(
            `
            SELECT *
            FROM friendships
            WHERE
            (user1_id=$1 AND user2_id=$2)
            OR
            (user1_id=$2 AND user2_id=$1)
            `,
            [senderId, receiverId]
        );

        if (alreadyFriends.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Already friends."
            });
        }

        // Existing request
        const exists = await pool.query(
            `
            SELECT *
            FROM friend_requests
            WHERE
            (
                sender_id=$1 AND receiver_id=$2
            )
            OR
            (
                sender_id=$2 AND receiver_id=$1
            )
            `,
            [senderId, receiverId]
        );

        if (exists.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Friend request already exists."
            });
        }

        await pool.query(
            `
            INSERT INTO friend_requests
            (
                sender_id,
                receiver_id,
                status
            )
            VALUES($1,$2,'pending')
            `,
            [senderId, receiverId]
        );

        res.json({
            success: true,
            message: "Friend Request Sent"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// =======================================
// GET PENDING REQUESTS
// =======================================

const getPendingRequests = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
                fr.id,
                u.id AS sender_id,
                u.full_name,
                u.city,
                u.gym_name,
                u.fitness_goal,
                u.experience,
                u.workout_time
            FROM friend_requests fr
            JOIN users u
            ON u.id=fr.sender_id
            WHERE
            fr.receiver_id=$1
            AND fr.status='pending'
            ORDER BY fr.id DESC
            `,
            [req.userId]
        );

        res.json({
            success: true,
            requests: result.rows
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// =======================================
// ACCEPT REQUEST
// =======================================

const acceptRequest = async (req, res) => {

    try {

        const requestId = req.params.id;

        const request = await pool.query(
            `
            SELECT *
            FROM friend_requests
            WHERE
            id=$1
            AND receiver_id=$2
            AND status='pending'
            `,
            [requestId, req.userId]
        );

        if (request.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Friend request not found."
            });
        }

        const sender = request.rows[0].sender_id;
        const receiver = request.rows[0].receiver_id;

        await pool.query(
            `
            UPDATE friend_requests
            SET status='accepted'
            WHERE id=$1
            `,
            [requestId]
        );

        await pool.query(
            `
            INSERT INTO friendships
            (
                user1_id,
                user2_id
            )
            VALUES($1,$2)
            `,
            [sender, receiver]
        );

        res.json({
            success: true,
            message: "Friend Request Accepted"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// =======================================
// REJECT REQUEST
// =======================================

const rejectRequest = async (req, res) => {

    try {

        await pool.query(
            `
            UPDATE friend_requests
            SET status='rejected'
            WHERE
            id=$1
            AND receiver_id=$2
            `,
            [req.params.id, req.userId]
        );

        res.json({
            success: true,
            message: "Friend Request Rejected"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// =======================================
// FRIEND LIST
// =======================================

const getFriends = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
                u.id,
                u.full_name,
                u.city,
                u.gym_name,
                u.fitness_goal,
                u.experience
            FROM friendships f
            JOIN users u
            ON
            (
                (u.id=f.user1_id AND f.user2_id=$1)
                OR
                (u.id=f.user2_id AND f.user1_id=$1)
            )
            ORDER BY u.full_name
            `,
            [req.userId]
        );

        res.json({
            success: true,
            friends: result.rows
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
    sendFriendRequest,
    getPendingRequests,
    acceptRequest,
    rejectRequest,
    getFriends
};