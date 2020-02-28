const express = require('express')
const connection = require('../../utils/database')
const sendJSONResultBack = require('../../utils/query')
const filter = require('../../utils/filter')
const router = express.Router()

// Get all buildings
router.get('/', (req, res) => {
    const getAllBuildings = `SELECT * FROM buildings`
    sendJSONResultBack(getAllBuildings, res)
})

// Create a building
router.post('/create', (req, res) => {
    const name = filter(req.body.name)
    if(name){
        const sql = `INSERT INTO buildings VALUES ('${name}')`
        connection.query(sql, (err, result) => {
            if(err)
                res.status(400).json({ msg: err })
            else 
                res.json({ name })
        })
    } else {
        res.status(400).json({ msg: "Please enter a valid name" })
    }
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
    const namesToDelete = req.body.names
    if(namesToDelete && !namesToDelete.some(x => filter(x) === '')){
        let sql = `DELETE FROM buildings WHERE `
        for(let i = 0; i < namesToDelete.length; i++){
            if(i === namesToDelete.length - 1){
                sql += `name = '${namesToDelete[i]}'`
            } else {
                sql += `name = '${namesToDelete[i]}' OR `
            }
        }
        connection.query(sql, (err, result) => {
            if(err)
                res.status(400).json({ msg: err })
            else 
                res.json({ namesToDelete })
        })
    } else {
        res.status(400).json({ msg: "No name(s) selected to delete" })
    }
})

module.exports = router