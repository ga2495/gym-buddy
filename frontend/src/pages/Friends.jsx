import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Friends() {

    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {

        loadRequests();
        loadFriends();

    }, []);

    // ===========================
    // Pending Requests
    // ===========================

    const loadRequests = async () => {

        try {

            const res = await api.get("/friends/requests");

            setRequests(res.data.requests);

        } catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Friends List
    // ===========================

    const loadFriends = async () => {

        try {

            const res = await api.get("/friends");

            setFriends(res.data.friends);

        } catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Accept Request
    // ===========================

    const acceptRequest = async (id) => {

        try {

            await api.put(`/friends/accept/${id}`);

            alert("Friend Request Accepted");

            loadRequests();

            loadFriends();

        } catch (err) {

            alert("Unable to accept request");

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>Friend Requests</h2>

                <hr />

                {
                    requests.length === 0 ?

                        <p>No Pending Requests</p>

                        :

                        requests.map((request) => (

                            <div
                                className="card mb-3"
                                key={request.id}
                            >

                                <div className="card-body">

                                    <h5>{request.full_name}</h5>

                                    <p>{request.city}</p>

                                    <p>{request.gym_name}</p>

                                    <button
                                        className="btn btn-success"
                                        onClick={() => acceptRequest(request.id)}
                                    >
                                        Accept
                                    </button>

                                </div>

                            </div>

                        ))

                }

                <br />

                <h2>Your Friends</h2>

                <hr />

                {
                    friends.length === 0 ?

                        <p>No Friends Yet</p>

                        :

                        friends.map((friend) => (

                            <div
                                className="card mb-3"
                                key={friend.id}
                            >

                                <div className="card-body">

                                    <h5>{friend.full_name}</h5>

                                    <p>{friend.city}</p>

                                    <p>{friend.gym_name}</p>

                                    <p>{friend.fitness_goal}</p>

                                </div>

                            </div>

                        ))

                }

            </div>

        </>

    );

}

export default Friends;