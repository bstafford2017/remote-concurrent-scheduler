const express = require('express')
const connection = require('../../utils/database')
const filter = require('../../utils/filter')
const insert = require('../../utils/database/insert')
const remove = require('../../utils/database/remove')
const select = require('../../utils/database/select')
const router = express.Router()

// Get all buildings
router.get('/', (req, res) => {
    select('buildings').then((results) => {
        res.json({ results })
    }).catch((err) => {
        res.status(400).json({ msg: err })
    })
})

// Create a building
router.post('/create', (req, res) => {
    const building = {
        name: req.body.name
    }
    insert(building, 'buildings').then((results) => {
        res.json({ results })
    }).catch((err) => {
        res.status(400).json({ msg: err })
    })
})

// Update a building
router.post('/update', (req, res) => {
    const listOfNewNames = []
    const namesToUpdate = req.body.names
    if(namesToUpdate && !namesToUpdate.some(x => filter(x.newName) === '')){
        namesToUpdate.forEach(name => {
            name.newName = filter(name.newName)
            if(name.newName === '')
                res.status(400).json({ msg: "Please enter valid name(s)" })
            const sql = `UPDATE buildings SET name = '${name.newName}' WHERE name = '${name.oldName}'`
            listOfNewNames.push(name.newName)
            connection.query(sql, (err, result) => {
                // Need return because of the forEach repeats
                if(err)
                    return res.status(400).json({ msg: err })

                // Means all items have been looped through
                if(listOfNewNames.length === namesToUpdate.length)
                    res.json({ listOfNewNames })
            })
        })
    } else {
        res.status(400).json({ msg: "No name(s) selected to update" })
    }
})

// Delete a building
router.post('/delete', (req, res) => {
    remove(req.body.names, 'buildings', 'name').then((results) => {
        res.json({ results })
    }).catch((err) => {
        res.status(400).json({ msg: err })
    })
})

module.exports = router