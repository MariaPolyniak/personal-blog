const CommentModel = require("./comment.model");

const insertComment = (author, article, content) => {
  return CommentModel.create({ author, article, content })
}

const findCommentById = commentId => {
  return CommentModel.findById(commentId);
}

const findCommentByArticleId = articleId => {
  return CommentModel.find({
    article: articleId
  }).populate('author');
}

const deleteComment = commentId => {
  CommentModel.deleteOne({ _id: commentId });
}

module.exports = {
  insertComment,
  findCommentById,
  findCommentByArticleId,
  deleteComment
}
