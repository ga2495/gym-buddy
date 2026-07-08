import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Buddies() {

    const [buddies, setBuddies] = useState([]);

    useEffect(() => {
        loadBuddies();
    }, []);

    const loadBuddies = async () => {

        try {

            const res = await api.get("/buddies");

            setBuddies(res.data.buddies);

        } catch (err) {

            console.log(err);

            alert("Unable to load buddies");

        }

    };

    const sendRequest = async (id) => {

        try {

            const res = await api.post(`/friends/request/${id}`);

            alert(res.data.message);

            loadBuddies();

        } catch (err) {

            alert(err.response?.data?.message || "Server Error");

        }

    };

    return (

        <Layout>

            <h2 className="mb-4">
                🔍 Find Gym Buddies
            </h2>

            <div className="row">

                {

                    buddies.length === 0 ?

                    (

                        <div className="col-12">

                            <div className="alert alert-info">

                                No buddies available.

                            </div>

                        </div>

                    )

                    :

                    buddies.map((user) => (

                        <div
                            className="col-md-4 mb-4"
                            key={user.id}
                        >

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h4>{user.full_name}</h4>

                                    <hr />

                                    <p>
                                        <strong>City:</strong> {user.city}
                                    </p>

                                    <p>
                                        <strong>Gym:</strong> {user.gym_name}
                                    </p>

                                    <p>
                                        <strong>Goal:</strong> {user.fitness_goal}
                                    </p>

                                    <p>
                                        <strong>Experience:</strong> {user.experience}
                                    </p>

                                    <p>
                                        <strong>Workout:</strong> {user.workout_time}
                                    </p>

                                    <p>
                                        <strong>Match Score:</strong> {user.match_score}%
                                    </p>

                                </div>

                                <div className="card-footer bg-white">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => sendRequest(user.id)}
                                    >
                                        Send Friend Request
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </Layout>

    );

}

export default Buddies;