import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Chat() {

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");

    useEffect(() => {

        loadFriends();

    }, []);

    useEffect(() => {

        if (selectedFriend) {

            loadMessages(selectedFriend.id);

        }

    }, [selectedFriend]);

    const loadFriends = async () => {

        try {

            const res = await api.get("/friends");

            setFriends(res.data.friends);

        } catch (err) {

            console.log(err);

        }

    };

    const loadMessages = async (friendId) => {

        try {

            const res = await api.get(`/chat/${friendId}`);

            setMessages(res.data.messages);

        } catch (err) {

            console.log(err);

        }

    };

    const sendMessage = async () => {

        if (!text.trim()) return;

        try {

            await api.post("/chat", {

                receiver_id: selectedFriend.id,

                message: text

            });

            setText("");

            loadMessages(selectedFriend.id);

        } catch (err) {

            alert("Unable to send message");

        }

    };

    return (

        <Layout>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white">

                            Friends

                        </div>

                        <div className="list-group list-group-flush">

                            {

                                friends.length === 0 ?

                                <div className="p-3">

                                    No Friends

                                </div>

                                :

                                friends.map((friend) => (

                                    <button

                                        key={friend.id}

                                        className={`list-group-item list-group-item-action ${selectedFriend?.id === friend.id ? "active" : ""}`}

                                        onClick={() => setSelectedFriend(friend)}

                                    >

                                        {friend.full_name}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                </div>

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            {

                                selectedFriend ?

                                `Chat with ${selectedFriend.full_name}`

                                :

                                "Select a Friend"

                            }

                        </div>

                        <div
                            className="card-body"
                            style={{
                                height: "400px",
                                overflowY: "auto"
                            }}
                        >

                            {

                                messages.length === 0 ?

                                <p>No Messages</p>

                                :

                                messages.map((msg) => (

                                    <div
                                        key={msg.id}
                                        className={`mb-3 ${msg.sender_id === selectedFriend.id ? "text-start" : "text-end"}`}
                                    >

                                        <span
                                            className={`badge ${msg.sender_id === selectedFriend.id ? "bg-secondary" : "bg-success"}`}
                                        >

                                            {msg.message}

                                        </span>

                                    </div>

                                ))

                            }

                        </div>

                        {

                            selectedFriend &&

                            <div className="card-footer">

                                <div className="input-group">

                                    <input

                                        className="form-control"

                                        placeholder="Type a message..."

                                        value={text}

                                        onChange={(e) => setText(e.target.value)}

                                    />

                                    <button

                                        className="btn btn-primary"

                                        onClick={sendMessage}

                                    >

                                        Send

                                    </button>

                                </div>

                            </div>

                        }

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Chat;