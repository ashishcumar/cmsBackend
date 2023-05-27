const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeaders = req.headers.Authorization || req.headers.authorization;
  console.log("req",req.headers)
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    console.log('token',token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;
