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

//     // FORM UNTUK REGISTER USER
    static async userRegisterForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

//     // HOME
    static async home(req, res) {
        try {
            let query = req.query.title
            let data = await Artist.getAllArtists(query)
            // let data =  await Song.getAllSongGenre()
            // res.send(data)
            res.render('home', {data})
        } catch (error) {
            res.send(error.message)
        }
    }

//     // PAGE UNTUK MENAMPILKAN DETAIL USER
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

//     // ADD SONG FORM (HANYA UNTUK ARTIST)
    static async addSongForm(req, res) {
        try {
            // res.send('add songgg')
            let id = req.session.userId
            let result = await Genre.getAllGenres(+id)
            // res.send(result)
            res.render('addSongForm', {result})
        } catch (error) {
            res.send(error.message)
        }
    }

    static async editSongForm(req, res) {
        try {
            
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = {Controller}