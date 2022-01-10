const express = require('express');

const tagController = require('../controllers/tag.controller');

const tagRouter = express.Router();

tagRouter.post('/', tagController.createTag);

tagRouter.get('/:name', tagController.getTag);

tagRouter.patch('/:name', tagController.updateTag);

tagRouter.delete('/:name', tagController.deleteTag);

module.exports = tagRouter;
