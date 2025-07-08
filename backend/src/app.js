const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const postRoutes = require("./routes/post");

const app = express();

app.use(cors());
app.use(express.json());

const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

const mongoUri = process.env.MONGO_URI;
console.log("MONGO_URI:", mongoUri);

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", protectedRoutes);

app.get("/", (req, res) => {
  res.send("Blog API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const errorLogStream = fs.createWriteStream(
  path.join(logDirectory, "error.log"),
  { flags: "a" }
);

app.use((err, req, res, next) => {
  const errorMessage = `[${new Date().toISOString()}] ${err.stack}\n`;
  errorLogStream.write(errorMessage);

  console.error("Internal Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
