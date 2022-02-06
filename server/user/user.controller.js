const UserModel = require('./user.model');

exports.getCurrentUser = async (req, res) => {
  const user = await UserModel.findById(req.user.user_id);

  res.json(user);
};
