const con = require('../utils/database')

function sendJSONResultBack(sql, res) {
  con.query(sql, (err, result) => 
    (err) ? res.sendStatus(400) : res.json(result)
  )
}

module.exports = sendJSONResultBack