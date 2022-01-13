const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"]?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }

  return next();
};

module.exports = verifyToken;
