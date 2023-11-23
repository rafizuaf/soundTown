// const { comparePassword } = require('../helper/bcrypt')
const { Artist, Genre, Song, User, GenreSong} = require('../models')

class Controller {
// FORM UNTUK REGISTER USER
    static async userRegisterForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

// HOME
    static async home(req, res) {
        try {
            let query = req.query.title
            let id = req.session.userId
            let data = await Artist.getAllArtists(query)
            res.render('home', {data, id})
        } catch (error) {
            res.send(error.message)
        }
    }

// PAGE UNTUK MENAMPILKAN DETAIL USER
    static async myProfile(req, res) {
        try {
            let id = req.session.userId
            let result = await User.getUserById(+id)
            res.render('myProfile', {result, id})
        } catch (error) {
            res.send(error.message)
        }
    }

// ADD SONG FORM (HANYA UNTUK ARTIST)
    static async addSongForm(req, res) {
        try {
            let id = req.session.userId
            let result = await Genre.getAllGenres(+id)
            let role = req.session.role

            if(role === 'admin') {
                res.render('addSongForm', {result, id})
            } else {
                res.redirect('/')
            }
        } catch (error) {
            res.send(error.message)
        }
    }

    // FORM EDIT
    static async editSongForm(req, res) {
        try {
            
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = {Controller}