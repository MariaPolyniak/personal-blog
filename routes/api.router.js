const express = require("express");

const postRouter = require('./post.router');

const apiRouter = express.Router();

apiRouter.use('/posts', postRouter);

apiRouter.get('*', function (req, res, next) {
  res.status(404).send('Not found!!!');
});

module.exports = apiRouter;
