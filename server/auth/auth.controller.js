const bcrypt = require('bcrypt');

const userRepository = require('../user/user.repository');

const createToken = require('./token.helper');
const normalizeUserResponse = require("../user/user.helper");

exports.signUp = async(req, res) => {
  const { firstName, lastName, login, password } = req.body;
  const avatarId = req.file?.filename ?? '';

  try {
    if (!(login && password && firstName && lastName)) {
      return res.status(400).json({ message: 'All inputs are required!' });
    }

    const currentUser = await userRepository.findUserByLogin(login);

    if (currentUser) {
      return res.status(409).json({ message: 'User already exists. Please sign up.'});
    }

    const newUser = await userRepository.insertUser(firstName, lastName, login, password, avatarId);

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

    const user = await userRepository.findUserByLogin(login);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id, login);

      return res.status(200).json({ user: normalizeUserResponse(user), token });
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
