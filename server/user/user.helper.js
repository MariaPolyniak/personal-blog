const normalizeUserResponse = user => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  login: user.login,
  avatarId: user.avatarId
});

module.exports = normalizeUserResponse;
