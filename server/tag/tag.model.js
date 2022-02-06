const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
}, {
  collection : 'tags',
  versionKey: false
});

const TagModel = mongoose.model('Tag', tagSchema);

module.exports = TagModel;
