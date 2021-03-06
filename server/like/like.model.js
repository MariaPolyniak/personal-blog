const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
}, {
  collection : 'likes',
  versionKey: false
});

const LikeModel = mongoose.model('Like', likeSchema);

module.exports = LikeModel;
