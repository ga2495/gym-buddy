import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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

        } catch {

            alert("Unable to load buddies");

        }

    };

    const sendRequest = async (id) => {

        try {

            await api.post(`/friends/request/${id}`);

            alert("Friend Request Sent");

        } catch (err) {

            alert(err.response?.data?.message || "Error");

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2>Find Gym Buddies</h2>

                <hr />

                <div className="row">

                    {

                        buddies.map((user) => (

                            <div
                                className="col-md-4 mb-4"
                                key={user.id}
                            >

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>{user.full_name}</h4>

                                        <p>{user.city}</p>

                                        <p>{user.gym_name}</p>

                                        <p>{user.fitness_goal}</p>

                                        <button
                                            className="btn btn-primary"
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

            </div>

        </>

    );

}

export default Buddies;