const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function verifyToken(req, res, next) {
  const secretKey = crypto.randomBytes(64).toString("base64");

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
