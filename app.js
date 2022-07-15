const express = require('express')
const app = express()
const port = 3000
const host = 'http://localhost'
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan')
const { loadContact, detailContact } = require('./data/Contact')

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
    title = 'Home Page'
    res.render('index', { title })
})
// Page About
app.get('/about', (req, res) => {
    data = {
        title: 'About Page',
        name: 'M. Daffa R. A.',
        occupation: 'Founder Daffapedia'
    }
    res.render('about', data)
})
// Page Contact Detail
app.get('/contact/:name', (req, res) => {
    data = {
        title: 'Contact Detail',
        name: req.params.name,
        contact: detailContact(req.params.name)
    }
    res.render('detail', { data })
})
// Page Contact
app.get('/contact', (req, res) => {
    data = {
        title: 'Contact Page',
        contact: loadContact()
    }

    res.render('contact', { data })
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