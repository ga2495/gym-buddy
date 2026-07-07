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

        const exists = await pool.query(
            `SELECT * FROM friend_requests
             WHERE sender_id=$1
             AND receiver_id=$2
             AND status='pending'`,
            [senderId, receiverId]
        );

        if (exists.rows.length > 0) {

            return res.status(400).json({
                success: false,
                message: "Request already sent"
            });

        }

        await pool.query(
            `INSERT INTO friend_requests
            (sender_id,receiver_id)
            VALUES($1,$2)`,
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
                friend_requests.id,
                users.id AS sender_id,
                users.full_name,
                users.city,
                users.gym_name,
                users.fitness_goal
            FROM friend_requests
            JOIN users
            ON users.id=friend_requests.sender_id
            WHERE receiver_id=$1
            AND status='pending'
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
            "SELECT * FROM friend_requests WHERE id=$1",
            [requestId]
        );

        if (request.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        const sender = request.rows[0].sender_id;
        const receiver = request.rows[0].receiver_id;

        await pool.query(
            "UPDATE friend_requests SET status='accepted' WHERE id=$1",
            [requestId]
        );

        await pool.query(
            `
            INSERT INTO friendships(user1_id,user2_id)
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
// FRIEND LIST
// =======================================

const getFriends = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
                users.id,
                users.full_name,
                users.city,
                users.gym_name,
                users.fitness_goal
            FROM friendships
            JOIN users
            ON (
                users.id=friendships.user1_id
                OR
                users.id=friendships.user2_id
            )
            WHERE
            friendships.user1_id=$1
            OR
            friendships.user2_id=$1
            `,
            [req.userId]
        );

        const friends = result.rows.filter(
            user => user.id !== req.userId
        );

        res.json({
            success: true,
            friends
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
    getFriends
};