import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        friends: 0,
        pendingRequests: 0,
        workouts: 0,
        messages: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/dashboard");

            setStats(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <div className="card text-center shadow">

                            <div className="card-body">

                                <h5>👥 Friends</h5>

                                <h2>{stats.friends}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card text-center shadow">

                            <div className="card-body">

                                <h5>📨 Requests</h5>

                                <h2>{stats.pendingRequests}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card text-center shadow">

                            <div className="card-body">

                                <h5>💪 Workouts</h5>

                                <h2>{stats.workouts}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card text-center shadow">

                            <div className="card-body">

                                <h5>💬 Messages</h5>

                                <h2>{stats.messages}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card mt-4 shadow">

                    <div className="card-body">

                        <h4>Welcome to Gym Buddy 💪</h4>

                        <p>
                            Manage your profile, find workout partners,
                            chat with friends, and track your workouts
                            all in one place.
                        </p>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Dashboard;