const normalizeUserResponse = user => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  login: user.login
});

module.exports = normalizeUserResponse;
