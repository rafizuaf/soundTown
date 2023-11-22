const { Artist, Genre, Song, User, GenreSong} = require('../models')

class Controller {
    static navbar(req, res) {
        try {
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
            res.render('home')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = {Controller}