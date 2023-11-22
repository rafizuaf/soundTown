const express = require('express')
const { Controller } = require('../controllers/controller')
const router = express.Router()

router.get('/navbar', Controller.navbar)
router.get('/', Controller.home)

module.exports = router