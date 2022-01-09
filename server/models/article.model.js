const mongoose = require('mongoose');

const TagModel = require("./tag.model");
const UserModel = require("./user.model");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: UserModel.modelName, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  tags: [{ type: Schema.Types.ObjectId, ref: TagModel.modelName }]
}, {
  collection : 'articles',
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.likes = ret.likes.length;

      return ret;
    }
  }
});

const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = ArticleModel;
