const bcrypt = require('bcrypt');

const hashPassword = async(req, res, next) => {
  const { password } = req.body;

  req.body.password = await bcrypt.hash(password, 10);

  next();
}

module.exports = hashPassword;

