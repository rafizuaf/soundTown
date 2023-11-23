const { Controller } = require('../controllers/controller')
const artists = require('express').Router()

artists.get('/addSong', Controller.addSongForm)

module.exports = artists