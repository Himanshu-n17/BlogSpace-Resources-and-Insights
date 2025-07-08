const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = "1h"; // Access token validity
const REFRESH_TOKEN_EXPIRY = "7d"; // Refresh token validity

function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
