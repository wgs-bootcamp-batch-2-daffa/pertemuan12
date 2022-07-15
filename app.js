const express = require('express')
const app = express()

const port = 3000
const host = 'http://localhost'

var expressLayouts = require('express-ejs-layouts');

var morgan = require('morgan')

var bodyParser = require('body-parser');

const { validationResult, check } = require('express-validator');

const { loadContact, detailContact, insertDataContacts, duplicateName, deleteContact } = require('./data/Contact')



// Set ejs
app.set('view engine', 'ejs');
// Use bodyparser
app.use(bodyParser.json())
// Use express-ejs
app.use(expressLayouts);
// Use url-encoded
app.use(express.urlencoded());
// Set express-ejs
app.set('layout', 'layouts/main');
// Use public folder
app.use(express.static('public'))
// Log time
app.use((req, res, next) => {
    console.log('<===========================================================>');
    console.log(Date(Date.now()));
    next()
})
// Use morgan
app.use(morgan('dev'));



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
// Page Add Contact
app.get('/contact/add', (req, res) => {
    data = {
        title: 'Add Contact',
    }

    res.render('add-contact', { data })
})
// Page Add Contact
app.get('/contact/form-update/:name', (req, res) => {
    const val = detailContact(req.params.name)
    data = {
        title: 'Edit Contact',
        oldName: val.Name,
        oldEmail: val.Email,
        oldPhone: val.Phone
    }

    res.render('edit-contact', { data })
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
// Delete Contact
app.get('/contact/delete/:name', (req, res) => {
    deleteContact(req.params.name)
    res.redirect('/contact')
})
// Save Contact
app.post(
    '/contact',
    // Validation name
    check('name').custom((value) => {
        if (duplicateName(value)) {
            throw new Error('is already exists');
        }
        return true
    }),
    // Validation email
    check('email')
        .isEmail()
        .withMessage(`isn't valid email`),
    // Validation phone
    check('phone')
        .isMobilePhone('id-ID')
        .withMessage(`isn't valid mobile phone`),
    (req, res) => {
        const result = validationResult(req)
        // If not valid
        if (!result.isEmpty()) {
            data = {
                title: 'Add Contact',
                errors: result.array(),
                oldName: req.body.name,
                oldEmail: req.body.email,
                oldPhone: req.body.phone
            }
            res.render('add-contact', { data });
        }
        // If valid
        else {
            data = {
                'name': req.body.name,
                'email': req.body.email,
                'phone': req.body.phone,
            }
            insertDataContacts(data.name, data.email, data.phone)
            res.redirect('/contact');
        }
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