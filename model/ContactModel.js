const { pool } = require("../database/db")
const table = 't_contacts'

// <=== SELECT ALL ===>
exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    `)

    return query
}
// <=== SELECT WHERE ===>
exports.findOne = async (column, input) => {
    const query = await pool.query(`
    SELECT * 
    FROM ${table} 
    WHERE ${column} = '${input}'
    `)

    return query
}
// <=== INSERT ===>
exports.insertOne = async (name, email, phone) => {
    const query = await pool.query(`
    INSERT
    INTO ${table}
    (name, phone, email)
    VALUES(
        '${name}',
        '${phone}',
        '${email}'
    )
    RETURNING *
    `)

    return query
}
// <=== UPDATE ===>
exports.update = async (column, input, name, email, phone) => {
    const query = await pool.query(`
    UPDATE ${table}
    SET 
    name = '${name}',
    phone= '${phone}',
    email= '${email}'
    WHERE ${column} = '${input}'
    RETURNING *
    `)

    return query
}
// <=== DELETE ===>
exports.deleteOne = async (column, input) => {
    const query = await pool.query(`
    DELETE 
    FROM ${table} 
    WHERE ${column} = '${input}'
    RETURNING *
    `)

    return query
}