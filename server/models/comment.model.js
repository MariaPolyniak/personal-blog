const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, {
  collection : 'comments',
  versionKey: false
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
