const express = require('express')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const router = express.Router()

// Get all events
router.get('/:search', (req, res) => {
    const cols = ['events.id']
    const join = [
        {
            table: 'users',
            userId: 'users.id'
        },
        {
            table: 'rooms',
            roomId: 'rooms.id'
        },
        {
            table: 'recurs',
            recurId: 'recurs.id'
        }
    ]
    const where = {
        title: req.params.search,
        room: req.params.search,
        building: req.params.search
    }
    select('events', where, 'OR', cols, join).then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Get particular day's events
router.get('/:year/:month/:day', (req, res) => {
    const where = {
        date: `${req.params.year}-${req.params.month}-${req.params.day}`
    }
    select('events', where).then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Create an event
router.post('/', (req, res) => {
    console.log(req.body)
    const event = {
        id: null,
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.start,
        endTime: req.body.end,
        recur: null,
        room: parseInt(req.body.room),
        user: null
    }
    insert(event, 'events', ['id', 'date', 'startTime', 'endTime']).then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Delete an event
router.delete('/:id', (req, res) => {
    remove([req.body.id], 'events', 'id').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

/*
create table recurs (
    id int not null,
    day int not null,
    end date not null,
    primary key (id));

create table events (
    id int not null auto_increment,
    title varchar(55) not null,
    date date not null,
    startTime time not null,
    endTime time not null,
    recur int,
    room int not null,
    user int,
    primary key (id),
    foreign key (recur) references recurs(id),
    foreign key (room) references rooms(id),
    foreign key (user) references users(id));
*/

module.exports = router