const mysql = require('mysql')

// Create connection
const database = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'rcs'
})

// Connect to database
database.connect((err) => {
  (err) ? console.log(err) : console.log('MySQL connected...')
})

module.exports = database