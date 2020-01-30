const mysql = require('mysql')

// Create connection
const database = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql',
  database : 'rcs'
})

// Connect to database
database.connect((err) => {
  if(err) throw err
  console.log('mysql connected...');
})

module.exports = database