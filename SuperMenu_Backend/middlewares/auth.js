const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = function (req, res, next) {
    console.log("here in auth")
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied! No token provided");
  try {
   const auth = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = auth;
    next();
  } catch (error) {
    res.status(401).send("Access denied! Invalid token");
    console.log(error);
  }
};