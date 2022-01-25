const express = require("express");

const userRouter = require('./user.router');
const articleRouter = require('./article.router');
const commentRouter = require('./comment.router');
const tagRouter = require('./tag.router');

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/tags', tagRouter);

apiRouter.get('*', function (req, res, next) {
  res.status(404).send('Not found!!!');
});

module.exports = apiRouter;
