const ArticleModel = require('./article.model');

exports.getArticles = async (req, res) => {
  try {
    let articlesQuery = ArticleModel.find();

    if(req.query.tag_id) {
      articlesQuery = articlesQuery.where('tags').in(req.query.tag_id);
    }

    const articles = await articlesQuery.populate('tags').populate('author', 'firstName lastName');

    res.json(articles);
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

exports.createNewArticle = async (req, res) => {
  const userId = req.headers['user-id'];
  const newArticle = new ArticleModel({
    author: userId,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags
  });

  try {
    await newArticle.save();

    res.status(201).json(newArticle);
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

    const updatedArticle = await ArticleModel.updateOne({ _id: req.params.id }, { $set: req.body });

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

    if(article.likes.includes(userId)) {
      return res.status(403).json({ message: 'You have already liked this article' });
    }

    await ArticleModel.updateOne(
    { _id: req.params.id },
    {
      $push: {
        likes: userId
      }
    });

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
