const express = require('express');

const commentController = require('./comment.controller');

const commentRouter = express.Router();

commentRouter.post('/', commentController.createComment);

commentRouter.get('/', commentController.getComments);

commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;
