const { Controller } = require('../controllers/controller')
const users = require('express').Router()
const path = require("path")


const multer = require('multer')
const UserController = require('../controllers/userController')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })
// const upload = multer({dest: "Images/"})

users.get('/register', UserController.formRegis)
users.post('/register', upload.single('profilePicture'), UserController.postRegis)
users.get('/login', UserController.formLogin)
users.post('/login', UserController.postLogin)


// users.get('/register', Controller.userRegisterForm)
// users.post("/register", upload.single('profilePicture'), Controller.userRegisterPost)

// users.get('/login', Controller.userLoginForm)
// users.post('/login', Controller.userLoginPost)
users.get('/:id', Controller.myProfile)
users.get('/:id/delete', Controller.deleteUser)



module.exports = users