const express = require('express')
const insert = require('../../utils/lib/insert')
const remove = require('../../utils/lib/remove')
const select = require('../../utils/lib/select')
const update = require('../../utils/lib/update')
const router = express.Router()

// Get all events
router.get('/', (req, res) => {
    select('events').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Get particular day's events
router.get('/:date', (req, res) => {
    const where = {
        date: req.params.date,
    }
    select('events', where).then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Create an event
router.post('/', (req, res) => {
    const event = {
        id: null,
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        roomId: req.body.roomId,
        userId: req.body.userId
    }
    insert(event, 'event').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Delete an event
router.delete('/:id', (req, res) => {
    remove([req.body.id], 'events', 'id').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

module.exports = router