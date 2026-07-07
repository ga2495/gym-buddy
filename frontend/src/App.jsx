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
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/buddies"
        element={
          <ProtectedRoute>
            <Layout>
              <Buddies />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <Layout>
              <Friends />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Layout>
              <Chat />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/workout"
        element={
          <ProtectedRoute>
            <Layout>
              <Workout />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;