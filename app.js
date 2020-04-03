const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

const db = require('./models')
const Todo = db.Todo
const User = db.User

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// mathod-override
app.use(methodOverride('_method'))

// session 
app.use(session({
    secret: 'sequelize',
    resave: false,
    saveUninitialized: false
}))

// use passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport) 
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

// add routers
app.use(require('./routes/home'))
app.use('/users', require('./routes/user'))

app.listen(3000, () => {
    console.log('localhost://3000')
})