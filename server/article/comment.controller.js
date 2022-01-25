const CommentModel = require('../models/comment.model');

exports.createComment = async (req, res) => {
  const userId = req.headers['user-id'];

  const comment = new CommentModel({
    author: userId,
    article: req.body.articleId,
    content: req.body.content
  });

  try {
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.updateComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);

    if(!comment) {
      return res.status(404).json({ message: "No data found" });
    }

    const updatedComment = await CommentModel.updateOne(
      { _id: req.params.id },
      { $set: { content: req.body.content } }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);

    if(!comment) {
      return res.status(404).json({ message: "No data found" });
    }

    await CommentModel.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
