// Express
const express = require('express')
// All Controller
const { HomePage } = require('../controller/HomeController')
const { AboutPage } = require('../controller/AboutController')
const { ContactDetail, ContactDelete, ContactUpdate, ContactSave, ContactPage } = require('../controller/ContactController')
// Validator
const { check } = require('express-validator');
const { duplicateName } = require('../helper/contact');
// Body parser
var bodyParser = require('body-parser');
const { Error404 } = require('../controller/ErrorController');
// Router
const router = express.Router()



// Use body-parser
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json())
// Use express
router.use(express.urlencoded({ extended: true }));




// Page Home
router.get('/', HomePage)
// Page About
router.get('/about', AboutPage)
// Page Contact Detail
router.get('/contact/:name', ContactDetail)
// Delete Contact
router.post('/contact/delete', ContactDelete)
// Update Contact
router.post('/update',
    // Validation name
    check('name').custom((value, { req }) => {
        if (!duplicateName(value) && value.toLowerCase() !== req.body.idName.toLowerCase()) {
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
    ContactUpdate)
// Save Contact
router.post('/save',
    // Validation name
    check('name').custom((value) => {
        if (!duplicateName(value)) {
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
    ContactSave)
// Page Contact
router.get('/contact', ContactPage)
// Page Error
router.use('/', Error404)


module.exports = {
    routes: router
}