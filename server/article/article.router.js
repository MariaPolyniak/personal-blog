const express = require('express');

const auth = require('../auth/auth.middleware');
const imageUpload = require('../image-storage/image.middleware');

const postController = require('./article.controller');

const articleRouter = express.Router();

articleRouter.post('/', auth, imageUpload.single('picture'), postController.createArticle);

articleRouter.get('/', auth, postController.getArticles);

articleRouter.get('/:id', auth, postController.getArticle);

articleRouter.patch('/:id', auth, imageUpload.single('picture'), postController.updateArticle);

articleRouter.post('/:id/like', auth, postController.likeArticle);

articleRouter.post('/:id/dislike', auth, postController.dislikeArticle);

articleRouter.delete('/:id', auth, postController.deleteArticle);

module.exports = articleRouter;
