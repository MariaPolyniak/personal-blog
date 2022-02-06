const express = require('express');

const imageController = require('./image.controller');

const imageRouter = express.Router();

imageRouter.get('/:imageId', imageController.getImage);

imageRouter.delete('/:imageId', imageController.deleteImage);

module.exports = imageRouter;
