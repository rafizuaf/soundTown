const { Controller } = require('../controllers/controller')
const users = require('express').Router()

users.get('/register', Controller.userRegisterForm)
users.get('/login', Controller.userLoginForm)

module.exports = users