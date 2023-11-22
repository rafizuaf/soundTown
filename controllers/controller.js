const { Artist, Genre, Song, User, GenreSong} = require('../models')

class Controller {
    static async createUser(req, res) {}
    
    static async userLoginForm(req, res) {
        try {
            res.render(`login`)
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = {Controller}