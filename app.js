const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// mathod-override
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.send('yo')
})

// 認證系統的路由
// 登入頁面
app.get('/users/login', (req, res) => {
    res.render('login')
})
// 登入檢查
app.post('/users/login', (req, res) => {
    res.send('login')
})
// 註冊頁面
app.get('/users/register', (req, res) => {
    res.render('register')
})
// 註冊檢查
app.post('/users/register', (req, res) => {
    res.send('register')
})
// 登出
app.get('/users/logout', (req, res) => {
    res.send('logout')
})

app.listen(3000, () => {
    console.log('localhost://3000')
})