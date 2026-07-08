const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const profileRoutes = require("./routes/profile.routes");
const authRoutes = require("./routes/auth.routes");
const buddyRoutes = require("./routes/buddy.routes");
const friendRoutes = require("./routes/friend.routes");
const chatRoutes = require("./routes/chat.routes");

console.log("✅ chat.routes loaded");
const workoutRoutes = require("./routes/workout.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const app = express();

// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

// ==========================
// ROUTES
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/buddies", buddyRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/dashboard", dashboardRoutes);
// ==========================
// HOME
// ==========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏋️ GYM BUDDY API RUNNING"
  });
});

// ==========================
// 404
// ==========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

module.exports = app;