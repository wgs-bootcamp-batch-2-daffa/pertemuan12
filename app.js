const express = require('express')
const app = express()
const port = 3000
const host = 'http://localhost'
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan')
const { loadContact } = require('./data/Contact')

// Set ejs
app.set('view engine', 'ejs');
// Use express-ejs
app.use(expressLayouts);
// Set express-ejs
app.set('layout', 'layouts/main');
// Use public folder
app.use(express.static('public'))
// Logger
app.use((req, res, next) => {
    console.log('<===========================================================>');
    console.log(Date(Date.now()));
    next()
})
// Page Home
app.get('/', (req, res) => {
    tittle = 'Home Page'
    res.render('index', { tittle })
})
// Page About
app.get('/about', (req, res) => {
    data = {
        tittle: 'About Page',
        name: 'M. Daffa R. A.',
        occupation: 'Founder Daffapedia'
    }
    res.render('about', data)
})
// Page Contact
app.get('/contact', (req, res) => {
    data = {
        tittle: 'Contact Page',
        contact: loadContact()
    }

    res.render('contact', { data })
})
// Page Drinks params
app.get('/drinks/:minuman', (req, res) => {
    res.send(
        'Minuman = ' + req.params.minuman
    )
})
// Page Drinks Get Method
app.get('/drinks', (req, res) => {
    res.send(
        'Minuman = ' + req.query.drink +
        '<br><br>' +
        'Keterangan = ' + req.query.description
    )
})
// Page Drinks Post Method
app.post('/drinks', urlencodedParser, (req, res) => {
    res.send(
        'Minuman = ' + req.body.drink +
        '<br><br>' +
        'Keterangan = ' + req.body.description
    )
})
// Page Error
app.use('/', (req, res) => {
    res.status(404)
    res.render('error')
})
// Listen Server
app.listen(port, () => {
    console.log(`App is running at : ${host}:${port}`);
})