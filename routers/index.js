const express = require('express')
const router = express.Router()
const { Controller } = require('../controllers/controller')
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

const upload = multer({storage: storage})
// const upload = multer({dest: "Images/"})

router.get('/register', UserController.formRegis)
router.post('/register', upload.single('profilePicture'), UserController.postRegis)
router.get('/login', UserController.formLogin)
router.post('/login', UserController.postLogin)

router.use(function(req, res, next){
    // console.log(req.session)
    if(!req.session.userId){
        const error = 'Please login First'
        res.redirect(`/login?error=${error}`)
    } else{
        next()
    }
})
// untuk logout
router.use("/users", require("./users"))
router.use("/artists", require("./artists"))
router.get('/users/:id/edit', Controller.editUserForm)
router.post('/users/:id/edit', upload.single('profilePicture'), Controller.editUserPost)
router.get('/likes/:id', Controller.incLike)

router.get('/', Controller.home)
router.get('/logout', UserController.logout)

module.exports = router