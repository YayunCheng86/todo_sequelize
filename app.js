const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
    require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

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

// locals variable
app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
})

// routers
app.use(require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/todos', require('./routes/todo'))
app.use('/auth', require('./routes/auth'))

app.listen(3000, () => {
    console.log('localhost://3000')
})