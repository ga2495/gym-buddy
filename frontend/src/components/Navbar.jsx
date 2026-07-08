import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const res = await api.get("/profile");

            setUser(res.data.user);

        } catch (err) {

            console.log(err);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    const isActive = (path) => location.pathname === path;

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/dashboard">

                    🏋️ Gym Buddy

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                                to="/profile"
                            >
                                Profile
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive("/buddies") ? "active" : ""}`}
                                to="/buddies"
                            >
                                Find Buddies
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive("/friends") ? "active" : ""}`}
                                to="/friends"
                            >
                                Friend Requests
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive("/chat") ? "active" : ""}`}
                                to="/chat"
                            >
                                Chat
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive("/workout") ? "active" : ""}`}
                                to="/workout"
                            >
                                Workout
                            </Link>
                        </li>

                    </ul>

                    <div className="d-flex align-items-center">

                        {user && (

                            <span className="text-white me-3">

                                👋 {user.full_name}

                            </span>

                        )}

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;