const ArticleModel = require('../models/article.model');
const LikeModel = require('../models/like.model');
const ArticleModel = require('./article.model');

exports.getArticles = async (req, res) => {
  const match = {};
  const sort = {};

  const limit = req.query.limit || 10;
  const skip = req.query.skip || 0;

  try {
    if(req.query.tag_id) {
      match.tags = { $in: [req.query.tag_id] }
    }

    if(req.query.sortBy){
      const [field, order] =  req.query.sortBy.split(':');
      sort[field] = order === 'desc' ? -1 : 1;
    }

    const articles = await ArticleModel
      .find(match)
      .limit(limit)
      .skip(limit * skip)
      .sort(sort)
      .populate('tags');

    res.send(articles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getPopularArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.aggregate([
      { $unwind: "$likes" },
      { $group: { _id:'$_id', doc: { $first:"$$ROOT" }, likesAmount: { $sum:1 } } },
      { $replaceRoot: { newRoot:"$doc" } },
      { $sort : { likesAmount: -1 } },
      { $limit: 10 }
    ]);

    res.json(articles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.createArticle = async (req, res) => {
  const userId = req.headers['user-id'];

  const article = new ArticleModel({
    author: userId,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags
  });

  try {
    await article.save();

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    const updatedArticle = await ArticleModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.likeArticle = async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const article = await ArticleModel.findById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    const like = await LikeModel.findOne({
      user: userId,
      article: article._id
    })

    if (like) {
      return res.status(403).json({ message: 'You have already liked this article' });
    }

    const newLike = new LikeModel({
      user: userId,
      article: article._id
    });

    article.likes.push(newLike);

    await Promise.all([newLike.save(), article.save()]);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    const deletedArticle = await ArticleModel.deleteOne({ _id: req.params.id });

    res.status(200).json(deletedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
