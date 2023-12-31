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
                // console.log(isValidPassword, "=====");
                if (isValidPassword) {
                    
                    req.session.userId = user.id
                    req.session.role = user.role
                    // console.log(req.session);
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
            if (req.session.userId) {
                res.redirect('/')
            } else {
                res.render('register')
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postRegis(req, res) {
        try {
            // console.log(req.body);
            const {filename} = req.file
            const {username, email, password} = req.body
            await User.create({username, email, password, role: 'admin', profilePicture: filename})
            
            res.redirect('/login')
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let errors = error.errors.map((item) => {
                    return item.message
                })
                res.send(errors)
            } else {
                res.send(error.message)
            }   
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy()
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = UserController