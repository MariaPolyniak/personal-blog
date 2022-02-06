const { ObjectId } = require("mongodb");

const ArticleModel = require("./article.model");

const insertArticle = (author, title, content, tags, pictureId = '') => {
  return ArticleModel.create({ author, title, content, tags, pictureId });
}

const findArticleById = articleId => {
  return ArticleModel.findById(articleId);
}

const findArticles = (match, limit, skip, userId) => {
  return ArticleModel.aggregate([
    {
      $match: match
    },
    {
      $skip: limit * skip
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $unwind: "$author"
    },
    {
      $addFields: {
        liked: {
          $in: [ ObjectId(userId), '$likes' ]
        },
        likes: {
          $size: '$likes'
        }
      }
    }
  ])
}

const updateArticle = (articleId, articleData) => {
  return ArticleModel.updateOne(
    { _id: ObjectId(articleId) },
    {
      $set: articleData
    }
  )
}

const deleteArticleById = articleId => {
  return ArticleModel.deleteOne({ _id: articleId });
}

const addLikesAmountAndAuthorInformation = articleId => {
  return ArticleModel.aggregate([
      {
        $match: { _id: ObjectId(articleId) }
      },
      {
        $addFields: {
          likes: {
            $size: '$likes'
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: "$author"
      },
    ],
  );
}

const addLike = (article, userId) => {
  article.likes.push(userId);

  article.save();
}

const deleteLike = (articleId, userId) => {
  return ArticleModel.updateOne(
    { _id: articleId },
    {
      $pull: {
        likes: userId
      }
    });
}

const addComment = (articleId, commentId) => {
  return ArticleModel.findOneAndUpdate(
    { _id: articleId },
    {
      $push: { comments: ObjectId(commentId) }
    }
  )
}

const deleteComment = commentId => {
  return ArticleModel.findOneAndUpdate(
    { comments: ObjectId(commentId) },
    {
      $pull: { comments: ObjectId(commentId) }
    }
  )
}

module.exports = {
  insertArticle,
  findArticleById,
  findArticles,
  updateArticle,
  deleteArticleById,
  addLikesAmountAndAuthorInformation,
  addLike,
  deleteLike,
  addComment,
  deleteComment
}
