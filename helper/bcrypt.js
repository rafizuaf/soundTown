const bcrypt = require('bcryptjs')

const hashPassword = (plainPass) => {
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(7))
}

const comparePassword = (plainPass, pass) => {
    return bcrypt.compareSync(plainPass, pass)
}

module.exports = {hashPassword, comparePassword}