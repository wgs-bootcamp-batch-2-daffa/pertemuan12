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
    return loadContact().find(e => e.Name == input)
}
// 
// Export modules
// 
module.exports = {
    loadContact,
    detailContact
}