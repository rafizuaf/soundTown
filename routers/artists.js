const { Controller } = require('../controllers/controller')
const artists = require('express').Router()

artists.get('/addSong', Controller.addSongForm)
// artists.get('/detail', Controller.showArtistDetail)

module.exports = artists