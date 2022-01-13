const express = require('express');

const hash = require('../middlewares/hash.middleware');
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/sign-up', hash, authController.signUp);
authRouter.post('/sign-in', authController.signIn);

module.exports = authRouter;
