import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Buddies from "./pages/Buddies";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import Workout from "./pages/Workout";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />

            <Route
                path="/profile"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />

            <Route
                path="/buddies"
                element={<ProtectedRoute><Buddies /></ProtectedRoute>}
            />

            <Route
                path="/friends"
                element={<ProtectedRoute><Friends /></ProtectedRoute>}
            />

            <Route
                path="/chat"
                element={<ProtectedRoute><Chat /></ProtectedRoute>}
            />

            <Route
                path="/workout"
                element={<ProtectedRoute><Workout /></ProtectedRoute>}
            />

        </Routes>

    );

}

export default App;