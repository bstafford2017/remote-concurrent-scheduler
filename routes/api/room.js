const select = require('../../utils/lib/select')
const insert = require('../../utils/lib/insert')
const remove = require('../../utils/lib/remove')
const update = require('../../utils/lib/update')
const express = require('express')
const router = express.Router()

// Get particular building's rooms
router.get('/:building', (req, res) => {
    const columns = ['building']
    const join = {
        table: 'buildings',
        name: 'name'
    }
    const where = {
        name: req.params.building
    }
    select('rooms', columns, join, where).then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

router.post('/create', (req, res) => {
    const room = {
        id: null,
        number: req.body.number,
        seats: parseInt(req.body.seats),
        projector: parseInt(req.body.projector),
        building: req.body.building
    }
    insert(room, 'rooms').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

router.post('/update', (req, res) => {
    const room = [{
        oldId: req.body.id,
        number: req.body.number,
        seats: req.body.seats,
        projector: req.body.projector,
        building: req.body.building
    }]
    const cols = ['id', 'number', 'seats', 'projector', 'building']
    update(room, 'rooms', cols, 'id').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

router.post('/delete', (req, res) => {
    const room = [req.body.id]
    remove(room, 'rooms', 'id').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

/*
create table rooms (
    id int not null auto_increment,
    number varchar(55) not null,
    seats int not null,
    projector boolean not null,
    building varchar(55) not null,
    primary key(id),
    foreign key (building) references buildings(name));
*/

module.exports = router