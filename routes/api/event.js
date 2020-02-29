const express = require('express')
const router = express.Router()

// Get all events
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM events'
  query(sql)
})

// Get particular day's events
router.get('/:date', (req, res) => {
  const sql = "SELECT * FROM events WHERE date = '" + req.params.date + "'"
  query(sql)
})

// Create an event
router.post('/', (req, res) => {
  const sql = "INSERT INTO events VALUES ('" + req.body.title + "', '" + 
  req.body.room + "', '" + req.body.buiding + "', " + req.body.date + ", " + 
  req.body.time + ", " + req.body.recur + ")"
  query(sql)
})

// Delete an event
router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM events WHERE title = '" + req.params.id + "', "
  query(sql)
})

module.exports = router