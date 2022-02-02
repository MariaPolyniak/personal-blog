const express = require('express');

const hash = require('./hash.middleware');
const imageUpload = require('../image-storage/image.middleware');

const authController = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/sign-up', imageUpload.single('avatar'), hash,  authController.signUp);
authRouter.post('/sign-in', authController.signIn);

module.exports = authRouter;
