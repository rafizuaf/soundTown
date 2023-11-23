const { Controller } = require('../controllers/controller')
const users = require('express').Router()

users.get('/register', Controller.userRegisterForm)
users.get('/login', Controller.userLoginForm)
users.get('/users/:id', Controller.myProfile)

module.exports = users