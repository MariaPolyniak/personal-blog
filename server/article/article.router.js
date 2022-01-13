const express = require('express');

const auth = require('../auth/auth.middleware');
const postController = require('./article.controller');

const articleRouter = express.Router();

articleRouter.post('/', auth, postController.createNewArticle);

articleRouter.get('/', auth, postController.getArticles);

articleRouter.get('/popular-articles', auth, postController.getPopularArticles);

articleRouter.get('/:id', auth, postController.getArticle);

articleRouter.patch('/:id', auth, postController.updateArticle);

articleRouter.post('/:id/like', auth, postController.likeArticle);

articleRouter.delete('/:id', auth, postController.deleteArticle);

module.exports = articleRouter;
