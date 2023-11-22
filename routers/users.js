const { Controller } = require('../controllers/controller')
const users = require('express').Router()

users.post('/register', Controller.createUser)
users.get('/login', Controller.userLoginForm)

module.exports = users