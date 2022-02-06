const CommentModel = require("./comment.model");

const insertComment = async(author, article, content) => {
  const comment = await CommentModel.create({ author, article, content });

  return comment.populate('author');
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
  return CommentModel.deleteOne({ _id: commentId });
}

module.exports = {
  insertComment,
  findCommentById,
  findCommentByArticleId,
  deleteComment
}
