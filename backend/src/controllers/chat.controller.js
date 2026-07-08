const pool = require("../config/db");

// =======================================
// SEND MESSAGE
// =======================================

const sendMessage = async (req, res) => {

    try {

        const senderId = req.userId;

        const { receiver_id, message } = req.body;

        if (!receiver_id || !message) {

            return res.status(400).json({
                success: false,
                message: "Receiver and message are required."
            });

        }

        await pool.query(
            `
            INSERT INTO messages
            (
                sender_id,
                receiver_id,
                message
            )
            VALUES($1,$2,$3)
            `,
            [senderId, receiver_id, message]
        );

        res.json({
            success: true,
            message: "Message Sent"
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
// GET CHAT MESSAGES
// =======================================

const getMessages = async (req, res) => {

    try {

        const senderId = req.userId;

        const receiverId = req.params.id;

        const result = await pool.query(
            `
            SELECT
                id,
                sender_id,
                receiver_id,
                message,
                created_at
            FROM messages
            WHERE
            (
                sender_id=$1
                AND
                receiver_id=$2
            )
            OR
            (
                sender_id=$2
                AND
                receiver_id=$1
            )
            ORDER BY created_at ASC
            `,
            [senderId, receiverId]
        );

        res.json({
            success: true,
            messages: result.rows
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
    sendMessage,
    getMessages
};