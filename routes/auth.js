const express = require('express')
const router = express.Router()

// Import both functions from auth.js controllers
const {login, register} = require('../controllers/auth')

// Set up routes for these functuons
router.post('/register', register)
router.post('/login', login)


module.exports = router