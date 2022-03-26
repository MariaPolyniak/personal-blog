const UserModel = require('../models/user.model');

exports.createUser = async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password
  });

  try {
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if(!user) {
      return res.status(404).json({ message: "No data found" });
    }

    const updatedUser = await UserModel.updateOne({ _id: req.params.id }, { $set: req.body });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if(!user) {
      return res.status(404).json({ message: "No data found" });
    }

    await UserModel.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
