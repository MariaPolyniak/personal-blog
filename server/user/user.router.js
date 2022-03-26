const express = require('express');

const auth = require('../auth/auth.middleware');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/current', auth, userController.getCurrentUser);

module.exports = userRouter;
