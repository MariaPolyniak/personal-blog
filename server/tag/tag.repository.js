const { ObjectId } = require("mongodb");

const TagModel = require("../tag/tag.model");

const insertOrUpdateTags = (tags, articleId) => {
  tags.forEach(async tagName => {
    await TagModel.findOneAndUpdate(
      { name: tagName },
      {
        $set: { name: tagName },
        $push: { articles: articleId }
      },
      { upsert: true }
    )
  })
}

const getPopularTags = () => {
  return TagModel.aggregate([
    { $unwind: "$articles" },
    { $group: { _id:"$name", size: { $sum: 1 } } },
    { $sort: { size: -1 } },
    { $limit: 5 }
  ])
}

const deleteArticleForMissingTags = async(updatedTags, articleId) => {
  const missingTags = await TagModel.find({ name: { $exists: true, $nin: updatedTags }});
  const normalizedMissingTags = missingTags.map(tag => tag.name);

  await TagModel.updateMany(
    { name: { $in: normalizedMissingTags } },
    {
      $pull: { articles: ObjectId(articleId) }
    }
  )
}

const deleteArticleForAllRelatedTags = articleId => {
  TagModel.updateMany(
    { articles: ObjectId(articleId) },
    {
      $pull: { articles: ObjectId(articleId) }
    }
  )
}

const deleteTagsWithoutArticles = () => {
  TagModel.deleteMany(
    {
      articles: { $eq: [] }
    }
  )
}

module.exports = {
  insertOrUpdateTags,
  getPopularTags,
  deleteArticleForMissingTags,
  deleteArticleForAllRelatedTags,
  deleteTagsWithoutArticles
}
