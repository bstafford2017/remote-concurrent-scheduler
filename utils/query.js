const con = require('../utils/database')

function query(sql) {
  con.query(sql, (err, result) => 
    (err) ? res.stats(400) : res.json(result)
  )
}

module.exports = query