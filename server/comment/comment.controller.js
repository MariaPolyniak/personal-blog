const commentRepository = require('../comment/comment.repository');
const articleRepository = require('../article/article.repository');

exports.createComment = async(req, res) => {
  try {
    const { author, article, content } = req.body;

    const comment = await commentRepository.insertComment(author, article, content);

    await articleRepository.addComment(req.body.article, comment._id);

    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getComments = async(req, res) => {
  try {
    const articleId = req.query['article-id'];

    const comments = await commentRepository.findCommentByArticleId(articleId);

    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const comment = await commentRepository.findCommentById(req.params.id);

    if(!comment) {
      return res.status(404).json({ message: "No data found" });
    }

    await articleRepository.deleteComment(req.params.id);

    await commentRepository.deleteComment(req.params.id);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
