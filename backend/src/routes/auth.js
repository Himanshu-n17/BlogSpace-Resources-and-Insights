const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const router = express.Router();

const refreshTokens = new Set();

// Register user
router.post(
  "/register",
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashedPassword });
      await user.save();

      const payload = { userId: user._id };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      refreshTokens.add(refreshToken);

      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };
      res.status(201).json({ accessToken, refreshToken, userResponse });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login the user
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const payload = { userId: user._id };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      refreshTokens.add(refreshToken);
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };

      res.json({ accessToken, refreshToken, userResponse });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No token provided" });
  if (!refreshTokens.has(refreshToken))
    return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = generateAccessToken({ userId: payload.userId });

    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

// Logout route for invalidate refresh token
router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) refreshTokens.delete(refreshToken);
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
