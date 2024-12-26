
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ status: 0, message: "no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET , (error, decoded) => {
    if (error) {
      return res
        .status(500)
        .json({ status: 0, message: "token has been expired" });
    }
    req.id = decoded.id;
    req.role = decoded.role;
    req.phone = decoded.phone;
    next();
  });
}

module.exports =verifyToken;