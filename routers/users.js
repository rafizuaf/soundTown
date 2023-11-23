
// users.get('/register', Controller.userRegisterForm)
// users.post("/register", upload.single('profilePicture'), Controller.userRegisterPost)

// users.get('/login', Controller.userLoginForm)
// users.post('/login', Controller.userLoginPost)
// users.get('/users/:id', Controller.myProfile)

const express = require('express')
const users = express.Router()

// middleware that is specific to this router

// define the home page route
users.get('/', (req, res) => {
  res.send('Birds home page')
})


module.exports = users