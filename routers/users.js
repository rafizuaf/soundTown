const { Controller } = require('../controllers/controller')
const users = require('express').Router()
const path = require("path")

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})
// const upload = multer({dest: "Images/"})


users.get('/register', Controller.userRegisterForm)
users.post("/register", upload.single('profilePicture'), Controller.userRegisterPost)

users.get('/login', Controller.userLoginForm)
users.post('/login', Controller.userLoginPost)
users.get('/users/:id', Controller.myProfile)


module.exports = users