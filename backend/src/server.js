require("dotenv").config();

require("./config/db");

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 GYM BUDDY SERVER STARTED");
  console.log(`🌍 http://localhost:${PORT}`);
  console.log("=================================");
});