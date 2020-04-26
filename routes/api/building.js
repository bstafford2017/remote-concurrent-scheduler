const express = require('express')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const filter = require('../../utils/filter')
const router = express.Router()

// Get all buildings
router.get('/', async (req, res) => {
    try {
        const results = await select('buildings')
        res.json({ results })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

// Create a building
router.post('/create', async (req, res) => {
    try {
        const building = {
            id: null,
            name: filter(req.body.name)
        }
        const results = await insert(building, 'buildings')
        res.json({ results })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

// Update a building
router.post('/update', async (req, res) => {
    try {
        const names = req.body.names.map(name => {
            return filter(name)
        })
        const results = await update(names, 'buildings')
        res.json({ results })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

// Delete a building
router.post('/delete', async (req, res) => {
    try {
        const ids = req.body.map(id => {
            return parseInt(id)
        })
        const results = await remove(ids, 'buildings', 'id')
        res.json({ results })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

/*
create table buildings(
    id int not null auto_increment,
    name varchar(55) not null unique,
    primary key(id));
*/

module.exports = router