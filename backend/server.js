// src/server.js
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
