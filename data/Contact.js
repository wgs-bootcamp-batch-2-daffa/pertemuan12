// 
// All require module
// 
const fs = require('fs')
// 
// DATA CONTACT VALIDATOR FUNCTION
// 
const folderValidator = (folder, fileJson) => {
    // Validation folder
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
    }

    // Validation file
    if (!fs.existsSync(fileJson)) {
        fs.writeFileSync(fileJson, '[]', 'utf8')
    }
}
// 
// LOAD CONTACT
// 
const loadContact = () => {
    // Initial folder & file json
    const folder = './data'
    const fileJson = './data/contacts.json'
    // Folder validation
    folderValidator(folder, fileJson)
    // Load data
    const file = fs.readFileSync('./data/contacts.json', 'utf8')
    const contacts = JSON.parse(file)

    // Return output
    return contacts
}
// 
// VALIDATOR DUPLICATE NAME
// 
const duplicateName = (input) => {
    // Return output
    return loadContact().find((e) => e.Name.toLowerCase() === input.toLowerCase())
}
// 
// DETAIL CONTACT
// 
const detailContact = (input) => {
    // Check name
    if (!duplicateName(input)) {
        return
    }

    // Return data
    return duplicateName(input)
}
// 
// INSERT DATA CONTACTS
// 
const insertDataContacts = (Name, Email, Phone) => {
    // Initial folder & file json
    const folder = './data'
    const fileJson = './data/contacts.json'

    // Validator folder json
    folderValidator(folder, fileJson)

    // Initial data
    const dataContacts = loadContact()
    let contact = { Name, Email, Phone }

    // Insert data
    dataContacts.push(contact)
    fs.writeFileSync('./data/contacts.json', JSON.stringify(dataContacts))

    // Return Success
    return
}
// 
// INSERT DATA CONTACTS
// 
const updateContact = (idName, Name, Email, Phone) => {
    // Initial folder & file json
    const folder = './data'
    const fileJson = './data/contacts.json'

    // Validator folder json
    folderValidator(folder, fileJson)

    // Initial data
    const dataContacts = loadContact()
    const update = dataContacts.find(e => e.Name === idName)

    console.log(update);
    update.Name = Name
    update.Email = Email
    update.Phone = Phone

    // Insert data
    fs.writeFileSync('./data/contacts.json', JSON.stringify(dataContacts))

    // Return Success
    return
}
// 
// DELETE CONTACT
// 
const deleteContact = (input) => {
    // Check name
    if (!duplicateName(input)) {
        return
    }

    // Delete data
    const newContact = loadContact().filter(e => e.Name !== input)
    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContact))

    return
}
// 
// Export modules
// 
module.exports = {
    loadContact,
    detailContact,
    insertDataContacts,
    duplicateName,
    deleteContact,
    updateContact
}