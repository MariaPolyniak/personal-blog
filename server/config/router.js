const express = require("express");

const articleRouter = require('../article/article.router');
const userRouter = require('../user/user.router');
const authRouter = require('../auth/auth.router');

const router = express.Router();

router.use('/articles', articleRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

router.get('*', function (req, res, next) {
  res.status(404).send('Not found!!!');
});

module.exports = router;
