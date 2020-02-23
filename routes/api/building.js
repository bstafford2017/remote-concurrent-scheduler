const express = require('express')
const connection = require('../../utils/database')
const sendJSONResultBack = require('../../utils/query')
const router = express.Router()

// Get all buildings
router.get('/', (req, res) => {
    const getAllBuildings = `SELECT * FROM buildings`
    sendJSONResultBack(getAllBuildings, res)
})

// Create a building
router.post('/create', (req, res) => {
    const name = req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    if(typeof name !== 'undefined'){
        const createBuilding = `INSERT INTO buildings VALUES ('${name}')`
        connection.query(createBuilding, (err, result) => {
            if(err)
                throw err
            res.json({ name })
        })
    } else {
        res.sendStatus(400)
    }
})

// Update a building
router.post('/update', (req, res) => {
    const listOfNewNames = []
    const namesToUpdate = req.body.names
    if(typeof namesToUpdate !== 'undefined'){
        namesToUpdate.forEach(name => {
            const filteredNewName = name.newName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            const updateName = `UPDATE buildings SET name = '${filteredNewName}' WHERE name = '${name.oldName}'`
            listOfNewNames.push(filteredNewName)
            connection.query(updateName, (err, result) => {
                if(err)
                    throw err
            })
        })
        res.json({ listOfNewNames })
    } else {
        res.sendStatus(400)
    }
})

// Delete a building
router.post('/delete', (req, res) => {
    const namesToDelete = req.body.names
    if(typeof namesToDelete !== 'undefined'){
        namesToDelete.forEach(name => {
            const deleteBuilding = `DELETE FROM buildings WHERE name = '${name}'`
            connection.query(deleteBuilding, (err, result) => {
                if(err)
                    throw err
            })
        })
        res.json({ namesToDelete })
    } else {
        res.sendStatus(400)
    }
})

module.exports = router