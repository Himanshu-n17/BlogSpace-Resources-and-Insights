const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = "1h"; // Access token validity
const REFRESH_TOKEN_EXPIRY = "7d"; // Refresh token validity

// Generating Access Token
function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// Generating Refresh Token
function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

// Verify Token (generic helper)
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // when invalid or expired token
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
