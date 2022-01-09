const express = require('express');

const postController = require('../controllers/article.controller');

const articleRouter = express.Router();

articleRouter.post('/', postController.createNewArticle);

articleRouter.get('/', postController.getArticles);

articleRouter.get('/popular-articles', postController.getPopularArticles);

articleRouter.get('/:id', postController.getArticle);

articleRouter.patch('/:id', postController.updateArticle);

articleRouter.post('/:id/like', postController.likeArticle);

articleRouter.delete('/:id', postController.deleteArticle);

module.exports = articleRouter;
