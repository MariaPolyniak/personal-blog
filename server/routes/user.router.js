const express = require('express');

const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);

userRouter.get('/:id', userController.getUser);

userRouter.patch('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
