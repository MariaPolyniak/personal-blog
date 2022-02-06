const express = require('express');

const tagController = require('./tag.controller');

const tagRouter = express.Router();

const auth = require('../auth/auth.middleware');

tagRouter.get('/popular', auth, tagController.getPopularTags);

module.exports = tagRouter;
