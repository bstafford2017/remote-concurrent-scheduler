const mysql = require('mysql')

// Create connection
const database = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'nodemysql'
})

// Connect to database
database.connect((err) => {
  if(err) throw err
  console.log('mysql connected...');
})

module.exports = database