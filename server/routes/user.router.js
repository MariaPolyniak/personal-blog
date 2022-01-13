const express = require('express');

const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/current', auth, userController.getCurrentUser);

module.exports = userRouter;
