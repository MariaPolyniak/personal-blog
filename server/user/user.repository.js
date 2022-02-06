const UserModel = require("../user/user.model");

const insertUser = (firstName, lastName, login, password, avatarId) => {
  return UserModel.create({ firstName, lastName, login, password, avatarId });
}

const findUserByLogin = login => {
  return UserModel.findOne({ login });
}

module.exports = {
  insertUser,
  findUserByLogin
}
