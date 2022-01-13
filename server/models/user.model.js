const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection : 'users',
  versionKey: false
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
