const pool = require("../config/db");

// =======================================
// SEND MESSAGE
// =======================================

const sendMessage = async (req, res) => {

    try {

        const senderId = req.userId;
        const receiverId = Number(req.params.id);
        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
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
            [
                senderId,
                receiverId,
                message
            ]
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
// GET CONVERSATION
// =======================================

const getConversation = async (req, res) => {

    try {

        const senderId = req.userId;
        const receiverId = Number(req.params.id);

        const result = await pool.query(
            `
            SELECT
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
            [
                senderId,
                receiverId
            ]
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
    getConversation
};