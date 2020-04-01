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
app.listen(3000, () => {
    console.log('localhost://3000')
})