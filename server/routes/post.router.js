const express = require('express');

const postController = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.createNewPost);

postRouter.get('/', postController.getPosts);

postRouter.get('/popular-posts', postController.getPopularPosts);

postRouter.get('/:id', postController.getPost);

postRouter.patch('/:id', postController.updatePost);

postRouter.post('/:id/like', postController.likePost);

postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;
