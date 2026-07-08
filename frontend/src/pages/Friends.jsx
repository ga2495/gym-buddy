import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Friends() {

    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        loadRequests();
        loadFriends();
    }, []);

    const loadRequests = async () => {
        try {
            const res = await api.get("/friends/requests");
            setRequests(res.data.requests);
        } catch (err) {
            console.log(err);
        }
    };

    const loadFriends = async () => {
        try {
            const res = await api.get("/friends");
            setFriends(res.data.friends);
        } catch (err) {
            console.log(err);
        }
    };

    const acceptRequest = async (id) => {
        try {

            const res = await api.put(`/friends/accept/${id}`);

            alert(res.data.message);

            loadRequests();
            loadFriends();

        } catch (err) {

            alert(err.response?.data?.message || "Unable to accept request");

        }
    };

    const rejectRequest = async (id) => {
        try {

            const res = await api.put(`/friends/reject/${id}`);

            alert(res.data.message);

            loadRequests();

        } catch (err) {

            alert(err.response?.data?.message || "Unable to reject request");

        }
    };

    return (

        <Layout>

            <h2 className="mb-4">
                🤝 Friend Requests
            </h2>

            {
                requests.length === 0 ?

                (
                    <div className="alert alert-info">
                        No Pending Requests
                    </div>
                )

                :

                requests.map((request) => (

                    <div
                        className="card shadow mb-3"
                        key={request.id}
                    >

                        <div className="card-body">

                            <h4>{request.full_name}</h4>

                            <p>
                                <strong>City:</strong> {request.city}
                            </p>

                            <p>
                                <strong>Gym:</strong> {request.gym_name}
                            </p>

                            <p>
                                <strong>Goal:</strong> {request.fitness_goal}
                            </p>

                            <div className="d-flex gap-2">

                                <button
                                    className="btn btn-success"
                                    onClick={() => acceptRequest(request.id)}
                                >
                                    Accept
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => rejectRequest(request.id)}
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    </div>

                ))
            }

            <hr className="my-5" />

            <h2 className="mb-4">
                👥 My Friends
            </h2>

            {
                friends.length === 0 ?

                (
                    <div className="alert alert-warning">
                        No Friends Yet
                    </div>
                )

                :

                <div className="row">

                    {

                        friends.map((friend) => (

                            <div
                                className="col-md-4 mb-4"
                                key={friend.id}
                            >

                                <div className="card shadow h-100">

                                    <div className="card-body">

                                        <h4>{friend.full_name}</h4>

                                        <hr />

                                        <p>
                                            <strong>City:</strong> {friend.city}
                                        </p>

                                        <p>
                                            <strong>Gym:</strong> {friend.gym_name}
                                        </p>

                                        <p>
                                            <strong>Goal:</strong> {friend.fitness_goal}
                                        </p>

                                        <p>
                                            <strong>Experience:</strong> {friend.experience}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            }

        </Layout>

    );

}

export default Friends;