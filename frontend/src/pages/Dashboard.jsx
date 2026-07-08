import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
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

        <Layout>

            <h2 className="mb-4">
                🏋️ Gym Buddy Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center h-100">
                        <div className="card-body">
                            <h5>👥 Friends</h5>
                            <h1>{stats.friends}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center h-100">
                        <div className="card-body">
                            <h5>📨 Requests</h5>
                            <h1>{stats.pendingRequests}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center h-100">
                        <div className="card-body">
                            <h5>💪 Workouts</h5>
                            <h1>{stats.workouts}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center h-100">
                        <div className="card-body">
                            <h5>💬 Messages</h5>
                            <h1>{stats.messages}</h1>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h3>Welcome to Gym Buddy 💪</h3>

                    <p className="mb-0">
                        Find workout partners, accept friend requests,
                        chat with friends, and manage your workouts
                        from one place.
                    </p>

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">
                    <Link
                        to="/profile"
                        className="btn btn-primary w-100 p-3"
                    >
                        👤 My Profile
                    </Link>
                </div>

                <div className="col-md-4 mb-3">
                    <Link
                        to="/buddies"
                        className="btn btn-success w-100 p-3"
                    >
                        🔍 Find Buddies
                    </Link>
                </div>

                <div className="col-md-4 mb-3">
                    <Link
                        to="/friends"
                        className="btn btn-warning w-100 p-3"
                    >
                        🤝 Friend Requests
                    </Link>
                </div>

                <div className="col-md-6 mb-3">
                    <Link
                        to="/chat"
                        className="btn btn-info w-100 p-3"
                    >
                        💬 Open Chat
                    </Link>
                </div>

                <div className="col-md-6 mb-3">
                    <Link
                        to="/workout"
                        className="btn btn-dark w-100 p-3"
                    >
                        💪 Workout Planner
                    </Link>
                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;