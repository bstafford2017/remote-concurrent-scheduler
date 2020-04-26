const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const filter = require('../../utils/filter')
const express = require('express')
const router = express.Router()

// Get particular building's rooms
router.get('/:building', async (req, res) => {
    try {
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
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

router.post('/create', async (req, res) => {
    try {
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
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

router.post('/update', async (req, res) => {
    try {
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
        console.log(err)
        res.status(400).json({ msg: err.toString() })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const room = [parseInt(filter(req.body.id))]
        const results = await remove(room, 'rooms', 'id')
        res.json({ results })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err.toString() })
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