const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const express = require('express')
const router = express.Router()

// Get particular building's rooms
router.get('/:building', async (req, res) => {
    try {
        const columns = ['rooms.id', 'number', 'seats', 'projector', 'name']
        const join = [{
            table: 'buildings',
            building: 'buildings.id'
        }]
        const where = {
            'buildings.id': req.params.building
        }
        const results = await select('rooms', where, 'OR', columns, join)
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err })
    }
})

router.post('/create', async (req, res) => {
    try {
        const room = {
            id: null,
            number: req.body.number,
            seats: parseInt(req.body.seats),
            projector: parseInt(req.body.projector),
            building: parseInt(req.body.building)
        }
        let insertResults = await insert(room, 'rooms')
        const columns = ['rooms.id', 'number', 'seats', 'projector', 'name']
        const join = {
            table: 'buildings',
            building: 'buildings.id'
        }
        const where = {
            'rooms.id' : insertResults.id
        }
        let selectResults = await select('rooms', where, 'AND', columns, join)
        res.json({ results: selectResults[0] })
    } catch (err){
        res.status(400).json({ msg: err })
    }
})

router.post('/update', async (req, res) => {
    try {
        const room = [{
            id: req.body.id,
            number: req.body.number,
            seats: parseInt(req.body.seats),
            projector: parseInt(req.body.projector),
            building: parseInt(req.body.building)
        }]
        const results = await update(room, 'rooms')
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const room = [req.body.id]
        const results = await remove(room, 'rooms', 'id')
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err })
    }
})

/*
create table rooms (
    id int not null auto_increment,
    number varchar(55) not null,
    seats int not null,
    projector boolean not null,
    building integer not null,
    primary key(id),
    foreign key (building) references buildings(id));
*/

module.exports = router