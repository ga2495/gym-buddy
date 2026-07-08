const chatRoutes = require("./routes/chat.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const workoutRoutes = require("./routes/workout.routes");
const buddyRoutes = require("./routes/buddy.routes");
const friendRoutes = require("./routes/friend.routes");
const profileRoutes = require("./routes/profile.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/buddies", buddyRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chat", chatRoutes);