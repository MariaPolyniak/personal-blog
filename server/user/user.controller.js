const UserModel = require('./user.model');

const normalizeUserResponse = require("./user.helper");

exports.getCurrentUser = async (req, res) => {
  const user = await UserModel.findById(req.user.user_id);

  res.json(normalizeUserResponse(user));
};
