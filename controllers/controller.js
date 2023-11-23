const { comparePassword } = require('../helper/bcrypt')
const { Artist, Genre, Song, User, GenreSong} = require('../models')

class Controller {
    // NAVBAR
    static navbar(req, res) {
        try {
            res.render('navbar')
        } catch (error) {
            res.send(error)
        }
    }

    // FORM UNTUK REGISTER USER
    static async userRegisterForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    // UNTUK CREATE USER
    static async userRegisterPost(req, res) {
        try {
            // console.log(req.body, ">>>>>>>>>>>>>>>>>>>");
            const {username, email, password } = req.body
            let user = await User.create({username, email, password, role: 'user', profilePicture: filename})
            // res.send(user)
            res.redirect('/login')
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    }
    
    // FORM UNTUK LOGIN USER
    static async userLoginForm(req, res) {
        try {
            res.render(`login`)
        } catch (error) {
            res.send(error)
        }
    }

    // LOGIN POST USER
    static async userLoginPost(req, res) {
        try {
            const {email, password} = req.body
            console.log(email, password);
            if (!email || !password) {
                throw {name: "ValidationError"}
            }

            let user = await User.findOne({where: {email}})
            console.log(user);

            if (!user) {
                throw {name: "FailedLogin"}
            }

            let isValidPassword = comparePassword(password, user.password)

            if (!isValidPassword) {
                throw {
                    name: "Unauthorized",
                    message: "Invalid email or password"
                }
            }

            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    // HOME
    static async home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = {Controller}