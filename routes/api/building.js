const express = require('express')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const filter = require('../../utils/filter')
const log = require('../../utils/log')
const router = express.Router()

// Get all buildings
router.get('/', async (req, res) => {
    try {
        const results = await select('buildings')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Create a building
router.post('/create', async (req, res) => {
    try {
        // Input validation
        if(!req.body.name) {
            throw new Error('Please enter a valid building name')
        }

        const building = {
            id: null,
            name: filter(req.body.name)
        }
        const results = await insert(building, 'buildings')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Update a building
router.post('/update', async (req, res) => {
    try {
        // Input validation
        if(!req.body.names) {
            throw new Error('Please select a building to modify')
        }

        const names = req.body.names.map(name => {
            return {
                id: parseInt(filter(name.id)),
                name: filter(name.name)
            }
        })
        const results = await update(names, 'buildings')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Delete a building
router.post('/delete', async (req, res) => {
    try {
        // Input validation
        if(!req.body.ids) {
            throw new Error('Please select a building to modify')
        }

        const ids = req.body.ids.map(id => {
            return parseInt(filter(id))
        })
        const results = await remove(ids, 'buildings', 'id')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

module.exports = router