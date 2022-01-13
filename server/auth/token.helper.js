const jwt = require('jsonwebtoken');

const createToken = (userId, login) => {
  return jwt.sign(
    { user_id: userId, login },
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );
}

module.exports = createToken;

