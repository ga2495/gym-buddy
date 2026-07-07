import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

    const navigate = useNavigate();
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

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

    <div className="container">

        <Link className="navbar-brand" to="/dashboard">
            🏋️ Gym Buddy
        </Link>

        <div className="navbar-nav">

            <Link className="nav-link" to="/dashboard">
                Dashboard
            </Link>

            <Link className="nav-link" to="/profile">
                Profile
            </Link>

            <Link className="nav-link" to="/buddies">
                Buddies
            </Link>

            <Link className="nav-link" to="/friends">
                Friends
            </Link>

            <Link className="nav-link" to="/chat">
                Chat
            </Link>

            <Link className="nav-link" to="/workout">
                Workout
            </Link>

        </div>

        <div className="ms-auto d-flex align-items-center">

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

</nav>
    );
}

export default Navbar;