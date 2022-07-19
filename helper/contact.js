const { findAll, findOne, update, deleteOne, insertOne } = require('../model/ContactModel')
// <=== LOAD CONTACT ===>
exports.loadContact = async () => {
    const query = await findAll()

    if (query.rowCount === 0) {
        return false
    }

    return query.rows
}
// <=== VALIDATOR DUPLICATE NAME ===>
exports.duplicateName = async (input) => {
    const query = await findOne('name', input)

    if (query.rowCount === 0) {
        return false
    }

    return query.rows.find(e => e.name.toLowerCase() === input.toLowerCase())
}
// <=== DETAIL CONTACT ===>
exports.detailContact = (input) => {
    return this.duplicateName(input)
}
// <=== INSERT DATA CONTACTS ===>
exports.insertDataContacts = async (name, email, phone) => {
    await insertOne(
        name,
        email,
        phone
    )

    return
}
// <=== UPDATE DATA CONTACTS ===>
exports.updateContact = async (idName, name, email, phone) => {
    await update(
        'name',
        idName,
        name,
        email,
        phone
    )

    return
}
// <=== DELETE CONTACT ===>
exports.deleteContact = async (input) => {
    await deleteOne(
        'name',
        input
    )

    return
}

