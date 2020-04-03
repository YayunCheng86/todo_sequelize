const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo

// read all todos page
router.get('/', (req, res) => {
    res.render('index')
})

// create a new todo
router.post('/new', (req, res) => {
    res.render('index')
})

// read a todo
router.get('/:id', (req, res) => {
    res.render('index')
})

// edit a todo
router.put('/:id', (req, res) => {
    res.render('index')
})

// delete a todo
router.delete('/:id', (req, res) => {
    res.render('index')
})

module.exports = router
