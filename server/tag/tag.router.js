const express = require('express');

const tagController = require('./tag.controller');

const tagRouter = express.Router();

tagRouter.get('/popular', tagController.getPopularTags);

module.exports = tagRouter;
