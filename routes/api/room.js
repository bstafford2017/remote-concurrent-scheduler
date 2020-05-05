const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const filter = require('../../utils/filter')
const log = require('../../utils/log')
const express = require('express')
const router = express.Router()

// Get particular building's rooms
router.get('/:building', async (req, res) => {
    try {
        // Input validation
        if(!req.params.building) {
            throw new Error('Please enter a valid building id')
        }

        const columns = ['rooms.id', 'number', 'seats', 'projector', 'name']
        const join = [
            {
            'JOIN': 'buildings',
            'building': 'buildings.id'
            }
        ]
        const where = {
            'buildings.id': parseInt(filter(req.params.building))
        }
        const results = await select('rooms', where, 'OR', columns, join)
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: 'System Error:' + err.toString() })
    }
})

router.post('/create', async (req, res) => {
    try {
        // Input validation
        if(!req.body.number || !req.body.seats || !req.body.projector
            || !req.body.building) {
            throw new Error('Please fill out the entire create room form')
        }

        const room = {
            id: null,
            number: parseInt(filter(req.body.number)),
            seats: parseInt(filter(req.body.seats)),
            projector: parseInt(filter(req.body.projector)),
            building: parseInt(filter(req.body.building))
        }
        let insertResults = await insert(room, 'rooms')
        const columns = ['rooms.id', 'number', 'seats', 'projector', 'name']
        const join = [
            {
            'JOIN': 'buildings',
            'building': 'buildings.id'
            }
        ]
        const where = {
            'rooms.id' : parseInt(filter(insertResults.id))
        }
        let selectResults = await select('rooms', where, 'AND', columns, join)
        res.json({ results: selectResults[0] })
    } catch (err){
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: 'System Error:' + err.toString() })
    }
})

router.post('/update', async (req, res) => {
    try {
        // Input validation
        if(!req.body.number || !req.body.seats || !req.body.seats
            || !req.body.projector || !req.body.building) {
            throw new Error('Please fill out the entire update form')
        }

        const room = [{
            id: parseInt(filter(req.body.id)),
            number: parseInt(filter(req.body.number)),
            seats: parseInt(filter(req.body.seats)),
            projector: parseInt(filter(req.body.projector)),
            building: parseInt(filter(req.body.building))
        }]
        const results = await update(room, 'rooms')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: 'System Error:' + err.toString() })
    }
})

router.post('/delete', async (req, res) => {
    try {
        // Input validation
        if(!req.body.id) {
            throw new Error('Please enter a valid room id to delete')
        }

        const room = [parseInt(filter(req.body.id))]
        const results = await remove(room, 'rooms', 'id')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: 'System Error:' + err.toString() })
    }
})

module.exports = router