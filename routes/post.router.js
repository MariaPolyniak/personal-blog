const express = require('express');

const articlesList = require('../articles.mock.json');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
  res.json(articlesList);
})

module.exports = postRouter;
