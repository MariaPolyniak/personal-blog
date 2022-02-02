const mongoose = require('mongoose');

const UserModel = require("../user/user.model");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: UserModel.modelName, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  pictureId: { type: String, required: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  tags: [{ type: String }]
}, {
  collection : 'articles',
  versionKey: false
});

const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = ArticleModel;
