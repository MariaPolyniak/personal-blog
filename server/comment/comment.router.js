const express = require('express');

const commentController = require('./comment.controller');

const auth = require('../auth/auth.middleware');

const commentRouter = express.Router();

commentRouter.post('/', auth, commentController.createComment);

commentRouter.get('/', auth, commentController.getComments);

commentRouter.delete('/:id', auth, commentController.deleteComment);

module.exports = commentRouter;
