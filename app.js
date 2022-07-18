const express = require('express')
const app = express()

const port = 3000
const host = 'http://localhost'

var expressLayouts = require('express-ejs-layouts');

var morgan = require('morgan')

var bodyParser = require('body-parser');

const { validationResult, check } = require('express-validator');

const { loadContact, detailContact, insertDataContacts, duplicateName, deleteContact, updateContact } = require('./data/Contact')



// Set ejs
app.set('view engine', 'ejs');
// Use bodyparser
app.use(bodyParser.json())
// Use express-ejs
app.use(expressLayouts);
// Use url-encoded
app.use(express.urlencoded({ extended: true }));
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
let flash = false



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
    const val = detailContact(req.params.name)
    let idName
    let oldName
    let oldEmail
    let oldPhone

    if (val !== undefined) {
        idName = val.Name
        oldName = val.Name
        oldEmail = val.Email
        oldPhone = val.Phone
    }

    data = {
        title: 'Contact Detail',
        name: req.params.name,
        contact: detailContact(req.params.name),
        idName,
        oldName,
        oldEmail,
        oldPhone,
        errors: []
    }
    res.render('detail', { data })
})
// Delete Contact
app.post('/contact/delete', (req, res) => {
    deleteContact(req.body.name)
    res.redirect('/contact')
})
// Update Contact
app.post(
    '/update',
    // Validation name
    check('name').custom((value, { req }) => {
        if (duplicateName(value) && value.toLowerCase() !== req.body.idName.toLowerCase()) {
            throw new Error(`Name is already exists!`);
        }
        return true
    }),
    // Validation email
    check('email')
        .isEmail()
        .withMessage(`Email isn't valid!`),
    // Validation phone
    check('phone')
        .isMobilePhone('id-ID')
        .withMessage(`Phone number isn't valid!`),
    (req, res) => {
        result = validationResult(req)
        if (!result.isEmpty()) {
            data = {
                title: 'Edit Contact',
                errors: result.array(),
                name: req.body.idName,
                contact: detailContact(req.body.idName),
                idName: req.body.idName,
                oldName: req.body.name,
                oldEmail: req.body.email,
                oldPhone: req.body.phone
            }
            console.log(data.oldName);
            res.render('detail', { data });
            return
        }
        flash = 'Update Contact Success!'
        updateContact(
            req.body.idName,
            req.body.name,
            req.body.email,
            req.body.phone)
        res.redirect('/contact')
    })
// Save Contact
app.post(
    '/save',
    // Validation name
    check('name').custom((value) => {
        if (duplicateName(value)) {
            throw new Error('Name is already exists!');
        }
        return true
    }),
    // Validation email
    check('email')
        .isEmail()
        .withMessage(`Email isn't valid!`),
    // Validation phone
    check('phone')
        .isMobilePhone('id-ID')
        .withMessage(`Phone number isn't valid!`),
    (req, res) => {
        const result = validationResult(req)
        // If not valid
        if (!result.isEmpty()) {
            data = {
                title: 'Add Contact',
                errors: result.array(),
                contact: loadContact(),
                oldName: req.body.name,
                oldEmail: req.body.email,
                oldPhone: req.body.phone
            }
            res.render('contact', { data });
            return
        }
        // If valid
        flash = 'Add Contact Success!'
        data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }
        insertDataContacts(data.name, data.email, data.phone)
        res.redirect('/contact');
    })
// Page Contact
app.get('/contact', (req, res) => {
    data = {
        title: 'Contact Page',
        contact: loadContact(),
        errors: [],
        flash
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