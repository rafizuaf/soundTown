const { Artist, Genre, Song, User, GenreSong} = require('../models')

class Controller {
    static navbar(req, res) {
        try {
            let id = req.params.id
            res.render('navbar')
        } catch (error) {
            res.send(error)
        }
    }
    static async userRegisterForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }
    
    static async userLoginForm(req, res) {
        try {
            res.render(`login`)
        } catch (error) {
            res.send(error.message)
        }
    }

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
}

module.exports = {Controller}