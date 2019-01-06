const express = require('express')


const userRoutes = function () {
    let userRouter = express.Router()
    let User = require('../models/user')
    let userController = require('../controllers/userController')(User)

    userRouter.post('/register', userController.postRegister)

    userRouter.post('/login', userController.postLogin)

    userRouter.get('/logout', userController.get)

}

module.exports = userRoutes