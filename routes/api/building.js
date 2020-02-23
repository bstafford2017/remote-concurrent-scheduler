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
router.post('/', (req, res) => {
    const name = req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
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

router.delete('/', (req, res) => {
    const name = req.body.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    if(typeof name !== 'undefined'){
        name.forEach(building => {
            const deleteBuilding = `DELETE FROM buildings WHERE name = '${building.name}'`
            connection.query(deleteBuilding, (err, result) => {
                if(err)
                    throw err
            })
        })
        res.json({ name })
    } else {
        res.sendStatus(400)
    }
})

module.exports = router