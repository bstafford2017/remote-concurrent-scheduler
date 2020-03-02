const select = require('../../utils/lib/select')
const insert = require('../../utils/lib/insert')
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
        name: req.body.name,
        seats: parseInt(req.body.seats),
        projector: parseInt(req.body.projector),
        building: req.body.building
    }
    console.log(room)
    insert(room, 'rooms').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

/*
create table rooms (
    id int not null auto_increment,
    name varchar(55) not null unique,
    seats int not null,
    projector boolean not null,
    building varchar(55) not null,
    primary key(id),
    foreign key (building) references buildings(name));
*/

module.exports = router