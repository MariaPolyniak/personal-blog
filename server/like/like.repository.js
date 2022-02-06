const LikeModel = require("../like/like.model");

const insertLike = (user, article) => {
  return LikeModel.create({ user, article });
}

const findLike = (user, article) => {
  return LikeModel.findOne({ user, article });
}

const deleteLike = (user, article) => {
  return LikeModel.deleteOne({ user, article });
}

module.exports = {
  insertLike,
  findLike,
  deleteLike
}
