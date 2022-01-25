const express = require('express');

const commentController = require('../controllers/comment.controller');

const commentRouter = express.Router();

commentRouter.post('/', commentController.createComment);

commentRouter.get('/:id', commentController.getComment);

commentRouter.patch('/:id', commentController.updateComment);

commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;
