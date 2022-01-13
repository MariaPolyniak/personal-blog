const express = require("express");

const articleRouter = require('./article.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

const apiRouter = express.Router();

apiRouter.use('/articles', articleRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

apiRouter.get('*', function (req, res, next) {
  res.status(404).send('Not found!!!');
});

module.exports = apiRouter;
