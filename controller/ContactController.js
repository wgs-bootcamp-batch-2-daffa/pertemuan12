const { loadContact, detailContact, insertDataContacts, duplicateName, deleteContact, updateContact } = require('../helper/contact')
const { validationResult } = require('express-validator');

// Flash Message
let flash = false

exports.ContactPage =
    async (req, res) => {
        data = {
            title: 'Contact Page',
            contact: await loadContact(),
            errors: [],
            flash
        }
        res.render('contact', { data })
    }

exports.ContactDetail =
    async (req, res) => {
        const detail = await detailContact(req.params.name)
        let idName
        let oldName
        let oldEmail
        let oldPhone

        if (detail) {
            idName = detail.name
            oldName = detail.name
            oldEmail = detail.email
            oldPhone = detail.phone
        }

        data = {
            title: 'Contact Detail',
            name: req.params.name,
            contact: detail,
            idName,
            oldName,
            oldEmail,
            oldPhone,
            errors: []
        }
        res.render('detail', { data })
    }

exports.ContactSave =
    async (req, res) => {
        const result = validationResult(req)
        // If not valid
        if (!result.isEmpty()) {
            data = {
                title: 'Add Contact',
                errors: result.array(),
                contact: await loadContact(),
                oldName: req.body.name,
                oldEmail: req.body.email,
                oldPhone: req.body.phone
            }
            console.log(data.contact);
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
        await insertDataContacts(data.name, data.email, data.phone)
        res.redirect('/contact');
    }

exports.ContactUpdate =
    async (req, res) => {
        result = validationResult(req)
        if (!result.isEmpty()) {
            data = {
                title: 'Edit Contact',
                errors: result.array(),
                name: req.body.idName,
                contact: await detailContact(req.body.idName),
                idName: req.body.idName,
                oldName: req.body.name,
                oldEmail: req.body.email,
                oldPhone: req.body.phone
            }
            res.render('detail', { data });
            return
        }
        await updateContact(
            req.body.idName,
            req.body.name,
            req.body.email,
            req.body.phone)
        flash = 'Update Contact Success!'
        res.redirect('/contact')
    }

exports.ContactDelete =
    async (req, res) => {
        await deleteContact(req.body.name)

        flash = 'Delete Contact Success!'

        res.redirect('/contact')
    }