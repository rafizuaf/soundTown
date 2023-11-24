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
            // res.send(data)
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
            // res.send(result)
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
    static async editUserForm(req, res) {
        try {
            let id = req.session.userId
            let user = await User.getUserById(+id)
            res.render('editUser', {user})
        } catch (error) {
            res.send(error.message)
        }
    }

    // DELETE FUNCTION
    static async deleteUser(req, res) {
        try {
            let id = req.session.userId
            await User.destroy({
                where: {
                    id: id
                }
            })
            req.session.destroy()
            res.redirect('/login')
        } catch (error) {
            res.send(error.message)
        }
    }

    // INCREMENT LIKE
    static async incLike(req, res) {
        try {
            const {id} = req.params
            await Song.increment({like: 1}, { where: { id } }) 
            res.redirect('/')
        } catch (error) {
            res.send(error.message)
        }
    }
    // static async editUserPost(req, res) {
    //     try {
    //         let id = req.session.userId
    //         const {filename} = req.file
    //         const {username, email, profilePicture, role} = req.body
    //         await User.editUserPost(username, email, role, profilePicture, id)
    //         // res.send(req.body);
    //         // res.send(user)
    //         res.redirect(`/users/${id}`)
    //     } catch (error) {
    //         console.log(error);
    //         res.send(error)
    //     }
    // }

    static async editUserPost(req, res) {
        try {
            let id = req.session.userId
            const {filename} = req.file
            const {username, email, role} = req.body
            await User.update({username, email, role, profilePicture: filename}, {where: id})
            // res.send(req.body);
            // res.send(user)
            res.redirect(`/users/${id}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = {Controller}