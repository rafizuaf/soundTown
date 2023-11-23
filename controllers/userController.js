const {User} = require('../models')
const bcrypt = require('bcryptjs')
const { comparePassword } = require('../helper/bcrypt')


class UserController {
    static async formLogin(req, res) {
        try {
            const {error} = req.query
            res.render('login', {error})
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            const {email, password} = req.body
            let user = await User.findOne({where: {email}})
            if (user) {
                const isValidPassword = comparePassword(password, user.password)

                if (isValidPassword) {
                    res.redirect('/')
                } else {
                    const error = `invalid username/password`
                    res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = `invalid username/password`
                res.redirect(`/login?error=${error}`)
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async formRegis(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegis(req, res) {
        try {
            console.log(req.body);
            const {filename} = req.file
            const {username, email, password} = req.body
            await User.create({username, email, password, role: 'admin', profilePicture: filename})
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = UserController