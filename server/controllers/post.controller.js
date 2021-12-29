const PostModel = require('../models/post.model');

exports.getPosts = async (req, res) => {
  try {
    let postsQuery = PostModel.find();

    if(req.query.tag_id) {
      postsQuery = postsQuery.where('tags').in(req.query.tag_id);
    }

    const posts = await postsQuery.populate('tags');

    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getPopularPosts = async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      { $unwind: "$likes" },
      { $group: { _id:'$_id', doc: { $first:"$$ROOT" }, likesAmount: { $sum:1 } } },
      { $replaceRoot: { newRoot:"$doc" } },
      { $sort : { likesAmount: -1 } },
      { $limit: 10 }
    ]);

    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.createNewPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ message: "No data found" });
    }

    const updatedPost = await PostModel.updateOne({ _id: req.params.id }, { $set: req.body });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.likePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ message: "No data found" });
    }

    if(post.likes.includes(req.query.user_id)) {
      return res.status(403).json({ message: 'You have already liked this post' });
    }

    await PostModel.updateOne(
    { _id: req.params.id },
    {
      $push: {
        likes: req.query.user_id
      }
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ message: "No data found" });
    }

    const deletedPost = await PostModel.deleteOne({ _id: req.params.id });

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
