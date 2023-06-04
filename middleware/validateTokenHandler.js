const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeaders = req.headers.Authorization || req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1].trim();
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err) => {
      if (err) {
        res.status(401).json({
          message:"User is not authorized"
        });
        throw new Error("User is not authorized");
      }
      next();
    });
  }
  if (!token) {
    res.status(401).json({
      message:"No Authorization Token!"
    });
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;
