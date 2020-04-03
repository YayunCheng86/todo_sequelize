const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')

const db = require('../models')
const Todo = db.Todo
const User = db.User

router.get('/', authenticated, (req, res) => {
    res.render('index')
})

module.exports = router