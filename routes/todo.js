const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

// read all todos page
router.get('/', authenticated, (req, res) => {
    res.redirect('/')
})

// read new page
router.get('/new', authenticated, (req, res) => {
    res.render('new')
})

// create a new todo
router.post('/', authenticated, (req, res) => {
    Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
  .then((todo) => { return res.redirect('/') })
  .catch((error) => { return res.status(422).json(error) })
})

// read a todo
router.get('/:id', authenticated, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user) throw new Error("user not found")
        return Todo.findOne({
            where: {
                Id: req.params.id,
                UserId: req.user.id
            }
        })
    })
    .then(todo => { return res.render('detail', { todo: todo.get() }) })
    .catch((error) => { return res.status(422).json(error) })
})

// read edit page
router.get('/:id/edit', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) throw new Error("user not found")
            return Todo.findOne({
                where: {
                    Id: req.params.id,
                    UserId: req.user.id,
                }
            })
        })
        .then((todo) => { return res.render('edit', { todo: todo.get() }) })
        .catch((error) => { return res.status(422).json(error) })
})

// edit a todo
router.put('/:id/edit', authenticated, (req, res) => {
    User.findByPk(req.user.id)
    .then( user => {
        if(!user) throw new Error("user not found")
        return  Todo.findOne({
            where: {
                Id: req.params.id,
                UserId: req.user.id
            }
        })
    })
    .then((todo) => {
        todo.name = req.body.name
        todo.done = req.body.done === "on"
        return todo.save()
    })
    .then((todo) => { return res.redirect(`/todos/${req.params.id}`) })
    .catch((error) => { return res.status(422).json(error) })
})

// delete a todo
router.delete('/:id/delete', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) throw new Error("user not found")
            return Todo.destroy({
                where: {
                    UserId: req.user.id,
                    Id: req.params.id
                }
            })
        })
        .then((todo) => { return res.redirect('/') })
        .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
