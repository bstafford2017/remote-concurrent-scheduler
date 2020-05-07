const mysql = require('mysql')
const log = require('./log')

// Create connection
const database = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'rcs'
})

// Connect to database
database.connect((err) => {
    (err) ? log('error-log', err.toString()) : console.log('MySQL connected...')
})

module.exports = database