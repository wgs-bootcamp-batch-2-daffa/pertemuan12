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
// Export modules
// 
module.exports = {
    loadContact,
}