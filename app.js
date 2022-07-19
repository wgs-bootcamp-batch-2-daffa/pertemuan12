// Import express
const express = require('express')
const app = express()
// Set port & host
const port = 3000
const host = 'http://localhost'
// Import ejs-layouts
var expressLayouts = require('express-ejs-layouts');
// Import morgan
var morgan = require('morgan');
const { pool } = require('./database/db');
// Import base routes
const baseRoute = require('./routes/routes')



// Set ejs
app.set('view engine', 'ejs');
// Use express-layouts
app.use(expressLayouts);
// Set express-layouts
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

app.get('/addasync', async (req, res) => {
    try {
        data = {
            name: 'hmm',
            phone: '089663417341',
            email: 'daffaraihan03@gmail.com'
        }
        const newContact = await pool.query(`
        DELETE FROM t_contacts WHERE name = 'anjay';
        `)
        res.json(newContact)
    } catch (error) {
        console.log(error.message);
    }
})
// APP
app.use(baseRoute.routes)



// Listen Server
app.listen(port, () => {
    console.log(`App is running at : ${host}:${port}`);
})