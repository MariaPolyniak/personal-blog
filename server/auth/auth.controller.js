const bcrypt = require('bcrypt');

const UserModel = require('../user/user.model');

const createToken = require('./token.helper');
const normalizeUserResponse = require("../user/user.helper");

exports.signUp = async(req, res) => {
  const {
    firstName,
    lastName,
    login,
    password
  } = req.body;

  try {
    if (!(login && password && firstName && lastName)) {
      return res.status(400).json({ message: 'All inputs are required!' });
    }

    const currentUser = await UserModel.findOne({ login });

    if (currentUser) {
      return res.status(409).json({ message: 'User already exists. Please sign up.'});
    }

    const newUser = await UserModel.create({ firstName, lastName, login, password });

    const token = createToken(newUser._id, login);

    res.status(201).json({ user: normalizeUserResponse(newUser), token });
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}

exports.signIn = async(req, res) => {
  const { login, password } = req.body;

  try {
    if (!(login && password)) {
      return res.status(400).send({ message: 'All inputs are required!' });
    }

    const user = await UserModel.findOne({ login });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id, login);

      return res.status(200).json({ user: normalizeUserResponse(user), token });
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
