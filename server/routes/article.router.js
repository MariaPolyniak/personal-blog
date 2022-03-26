const express = require('express');

const articleController = require('../controllers/article.controller');

const articleRouter = express.Router();

articleRouter.post('/', articleController.createArticle);

articleRouter.get('/', articleController.getArticles);

articleRouter.get('/popular-articles', articleController.getPopularArticles);

articleRouter.get('/:id', articleController.getArticle);

articleRouter.patch('/:id', articleController.updateArticle);

articleRouter.post('/:id/like', articleController.likeArticle);

articleRouter.delete('/:id', articleController.deleteArticle);

module.exports = articleRouter;
