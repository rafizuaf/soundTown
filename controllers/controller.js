const { comparePassword } = require('../helper/bcrypt')
const { Artist, Genre, Song, User, GenreSong} = require('../models')

class Controller {
    // NAVBAR
    static navbar(req, res) {
        try {
            let id = req.params.id
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
            let query = req.query.title
            let data = await Artist.getAllArtists(query)
            // res.send(data)
            res.render('home', {data})
        } catch (error) {
            res.send(error.message)
        }
    }

    // PAGE UNTUK MENAMPILKAN DETAIL USER
    static async myProfile(req, res) {
        try {
            let id = req.params.id
            let result =  await User.getUserById(+id)
            // res.send(result)
            res.render('userProfile', {result})
        } catch (error) {
            res.send(error.message)
        }
    }

    // ADD SONG FORM (HANYA UNTUK ARTIST)
    static async addSongForm(req, res) {
        try {
            // res.send('add songgg')
            res.render('addSongForm')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = {Controller}