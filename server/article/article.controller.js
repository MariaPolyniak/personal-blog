const fs = require('fs');
const path = require('path');

const { IMAGE_STORAGE_DIRECTORY } = require('../image-storage/image.constants');

const articleRepository = require('./article.repository');
const tagRepository = require('../tag/tag.repository');
const likeRepository = require('../like/like.repository');

const { normalizeTags } = require('../tag/tag.helper');

exports.createArticle = async (req, res) => {
  try {
    const userId = req.user.user_id;
    let { title, content, tags } = req.body;
    const avatarId = req.file?.filename;

    tags = normalizeTags(tags);

    const article = await articleRepository.insertArticle(userId, title, content, tags, avatarId);

    await tagRepository.insertOrUpdateTags(tags, article._id);

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getArticle = async(req, res) => {
  try {
    const article = await articleRepository.findArticleById(req.params.id);

    res.json(article);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.getArticles = async (req, res) => {
  try {
    const match = {};

    const limit = +req.query.limit || 10;
    const skip = +req.query.skip - 1 || 0;

    const userId = req.user.user_id;

    if(req.query.tag_name) {
      match.tags = { $in: [req.query.tag_name] }
    }

    const articles = await articleRepository.findArticles(match, limit, skip, userId);

    const response = {
      data: articles,
      pageSize: limit,
      pageIndex: skip,
      total: articles.length
    }

    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateArticle = async(req, res) => {
  try {
    let { title, content, tags } = req.body;
    tags = normalizeTags(tags);
    const newPictureId = req.file?.filename;

    if(newPictureId) {
      req.body.pictureId = newPictureId;
    }

    const article = await articleRepository.findArticleById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    if(article.pictureId && newPictureId) {
      fs.unlink(path.resolve(IMAGE_STORAGE_DIRECTORY, article.pictureId), err => {
        if (err) {
          console.log(`Error occurred: ${err}`)
        }
      })
    }

    await tagRepository.insertOrUpdateTags(tags, article._id);

    await tagRepository.deleteArticleForMissingTags(tags, article._id);

    await tagRepository.deleteTagsWithoutArticles();

    await articleRepository.updateArticle(req.params.id, { title, content, tags });

    const updatedArticle = await articleRepository.addLikesAmountAndAuthorInformation(req.params.id);

    res.status(200).json(updatedArticle[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.likeArticle = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const article = await articleRepository.findArticleById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    const like = await likeRepository.findLike(userId, article._id);

    if (like) {
      return res.status(403).json({ message: 'You have already liked this article' });
    }

    await likeRepository.insertLike(userId, article._id);

    await articleRepository.addLike(article, userId);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.dislikeArticle = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const article = await articleRepository.findArticleById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    const like = await likeRepository.findLike(userId, article._id);

    if(like) {
      await likeRepository.deleteLike(userId, article._id);
    }

    await articleRepository.deleteLike(article._id, userId);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteArticle = async (req, res) => {
  try {
    const article = await articleRepository.findArticleById(req.params.id);

    if(!article) {
      return res.status(404).json({ message: "No data found" });
    }

    await tagRepository.deleteArticleForAllRelatedTags(req.params.id);

    await tagRepository.deleteTagsWithoutArticles();

    const deletedArticle = await articleRepository.deleteArticleById(req.params.id);

    res.status(200).json(deletedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
