import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Chat() {

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            const res = await api.get("/friends");
            setFriends(res.data.friends);
        } catch (err) {
            console.log(err);
        }
    };

    const loadConversation = async (friendId) => {
        try {
            const res = await api.get(`/chat/${friendId}`);
            setMessages(res.data.messages);
            setSelectedFriend(friendId);
        } catch (err) {
            console.log(err);
        }
    };

    const sendMessage = async () => {

        if (!message.trim()) return;

        await api.post(`/chat/send/${selectedFriend}`, {
            message
        });

        setMessage("");

        loadConversation(selectedFriend);
    };

    return (

        <Layout>

            <div className="row">

                {/* Friends List */}

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-header">

                            Friends

                        </div>

                        <ul className="list-group list-group-flush">

                            {

                                friends.map(friend => (

                                    <li
                                        key={friend.id}
                                        className="list-group-item list-group-item-action"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => loadConversation(friend.id)}
                                    >

                                        <b>{friend.full_name}</b>

                                        <br />

                                        <small>{friend.city}</small>

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                </div>

                {/* Chat */}

                <div className="col-md-8">

                    <div className="card">

                        <div
                            className="card-body"
                            style={{
                                height: "400px",
                                overflowY: "auto"
                            }}
                        >

                            {

                                messages.map((msg, index) => (

                                    <div
                                        key={index}
                                        className="mb-2"
                                    >

                                        <b>User {msg.sender_id}</b>

                                        <br />

                                        {msg.message}

                                    </div>

                                ))

                            }

                        </div>

                        <div className="card-footer d-flex">

                            <input
                                className="form-control"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                            />

                            <button
                                className="btn btn-primary ms-2"
                                onClick={sendMessage}
                                disabled={!selectedFriend}
                            >

                                Send

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Chat;