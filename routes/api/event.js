const express = require('express')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const filter = require('../../utils/filter')
const log = require('../../utils/log')
const jwt = require('jsonwebtoken')
const router = express.Router()

function getWeekString(day) {
    switch(day){
        case 0:
            return '1______'
        case 1:
            return '_1_____'
        case 2:
            return '__1____'
        case 3:
            return '___1___'
        case 4:
            return '____1__'
        case 5:
            return '_____1_'
        case 6:
            return '______1'
        default:
            throw new Error('Please enter valid input')
    }
}

// Get all events
router.get('/:search', async (req, res) => {
    try {
        // Input validation
        if(!req.params.search) {
            throw new Error('Please enter a valid search')
        }

        const cols = [
            'events.id',
            'events.title',
            'events.date',
            'events.startTime',
            'events.endTime',
            'buildings.name',
            'rooms.number',
            'users.username',
            'recurs.weekdays',
            'recurs.end'
        ]
        const join = [
            {
                'JOIN': 'users',
                'user': 'users.id'
            },
            {
                'JOIN': 'rooms',
                'room': 'rooms.id'
            },
            {
                'LEFT OUTER JOIN': 'recurs',
                recur: 'recurs.id'
            },
            {
                'JOIN': 'buildings',
                'rooms.building': 'buildings.id'
            }
        ]
        const where = {
            title: filter(req.params.search),
            'rooms.number': filter(req.params.search),
            'buildings.name': filter(req.params.search),
            'users.username': filter(req.params.search),
            date: filter(req.params.search)
        }
        const results = await select('events', where, 'OR', cols, join,
            null, null, null, true)
        results.sort((a, b) => {
            return a.date - b.date;
        })
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Get particular month's events
router.get('/:year/:month', async (req, res) => {
    try {
        // Input validation
        if(!req.params.year || !req.params.month) {
            throw new Error('Please enter a valid year and month')
        }

        let results = [[]]
        const date = new Date(req.params.year, req.params.month - 1, '01', '00', '00', '01')
        for(let i = 0; i < date.getDate(); i++) {
            results[i] = []
            const formattedDate = date.toISOString().split('T')[0]
            const cols = [
                'events.id',
                'events.title',
                'events.date',
                'events.startTime',
                'events.endTime',
                'buildings.name',
                'rooms.number',
                'events.room',
                'recurs.end',
                'recurs.weekdays',
                'recurs.id AS recurId'
            ]
            const join = [
                {
                    'join': 'rooms',
                    'events.room': 'rooms.id'
                },
                {
                    'join': 'buildings',
                    'rooms.building': 'buildings.id'
                },
                {
                    'left join': 'recurs',
                    'events.recur': 'recurs.id'
                }
            ]
            const matchWeek = getWeekString(date.getDay())
            let where = {}
            if(req.body.room && req.body.building){
                where = {
                    'events.date': formattedDate,
                    'recurs.weekdays': matchWeek,
                    'recurs.end': formattedDate,
                    'date': formattedDate,
                    'buildings.name': filter(req.body.building),
                    'rooms.number': filter(req.body.room)
                }
            } else {
                where = {
                    'events.date': formattedDate,
                    'recurs.weekdays': matchWeek,
                    'recurs.end': formattedDate,
                    'date': formattedDate
                }
            }
            const whereCompare = {
                'recurs.end': '>=',
                'date': '<='
            }
            const selectResults = await select('events', where, 'OR', cols, join, whereCompare, 'AND', true)
            for(let j = 0; j < selectResults.length; j++) {
                if(j == 0) {
                    results[i] = [selectResults[j]]
                } else {
                    results[i] = [...results[i], selectResults[j]]
                }
            }
            date.setDate(date.getDate() + 1)
        }
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Get particular day's events
router.post('/:year/:month/:day', async (req, res) => {
    try {
        // Input validation
        if(!req.params.year || !req.params.month || !req.params.day) {
            throw new Error('Please enter a valid year, month and day')
        }

        const cols = [
            'events.id',
            'events.title',
            'events.date',
            'events.startTime',
            'events.endTime',
            'buildings.name',
            'rooms.number',
            'events.room',
            'recurs.end',
            'recurs.weekdays',
            'recurs.id AS recurId'
        ]
        const join = [
            {
                'join': 'rooms',
                'events.room': 'rooms.id'
            },
            {
                'join': 'buildings',
                'rooms.building': 'buildings.id'
            },
            {
                'left join': 'recurs',
                'events.recur': 'recurs.id'
            }
        ]
        const date = new Date(`${req.params.year}-${req.params.month}-${req.params.day}T00:00:01`)
        const matchWeek = getWeekString(date.getDay())
        let where = {
            'events.date': `${req.params.year}-${req.params.month}-${req.params.day}`,
            'recurs.weekdays': matchWeek,
            'recurs.end': `${req.params.year}-${req.params.month}-${req.params.day}`,
            'date': `${req.params.year}-${req.params.month}-${req.params.day}`
        }
        const whereCompare = {
            'recurs.end': '>=',
            'date': '<='
        }
        let results = await select('events', where, 'OR', cols, join, whereCompare, 'AND', true)

        // Filter out results because of complex query
        if(req.body.room && req.body.building) {
            results = results.filter(row => row.name === req.body.building && 
                row.number === req.body.room)
        }
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Create an event
router.post('/create', async (req, res) => {
    try {
        // Input validation
        if(!req.body.title || !req.body.date || !req.body.start
            || !req.body.end || !req.body.room) {
                throw new Error('Please fill out entire create event form')
        } 

        // Validate availibility
        const cols = [
            'events.id',
            'events.title',
            'events.date',
            'events.startTime',
            'events.endTime',
            'buildings.name',
            'rooms.number',
            'events.room',
            'recurs.end',
            'recurs.weekdays',
            'recurs.id AS recurId'
        ]
        const join = [
            {
                'join': 'rooms',
                'events.room': 'rooms.id'
            },
            {
                'join': 'buildings',
                'rooms.building': 'buildings.id'
            },
            {
                'left join': 'recurs',
                'events.recur': 'recurs.id'
            }
        ]
        const date = new Date(`${req.body.date}T00:00:01`)
        const matchWeek = getWeekString(date.getDay())

        // For getting a regular event that overlap
        const where1 = {
            'events.date': filter(req.body.date),
            'room': parseInt(filter(req.body.room)),
            'startTime': filter(req.body.end),
            'endTime': filter(req.body.start)
        }
        const whereCompare1 = {
            'startTime': '<',
            'endTime': '>'
        }
        const eventResults1 = await select('events', where1, 'AND', cols, join, whereCompare1, 'AND', true)

        // For gettings recurring events that overlap
        const where2 = {
            'recurs.weekdays': filter(matchWeek),
            'room': parseInt(filter(req.body.room)),
            'recurs.end': filter(req.body.date),
            'date': filter(req.body.date),
            'startTime': filter(req.body.end),
            'endTime': filter(req.body.start)
        }
        const whereCompare2 = {
            'recurs.end': '>=',
            'date': '<=',
            'startTime': '<',
            'endTime': '>'
        }
        const eventResults2 = await select('events', where2, 'AND', cols, join, whereCompare2, 'AND', true)
        const fullEventResults = eventResults1.concat(eventResults2)
        if(fullEventResults.length !== 0) {
            res.status(400).json({ msg: 'Room is unavailable during this time / date' })
            return
        }

        // Insert recur
        let recurInsertResults = null
        if(req.body.weekString && req.body.endRecur) {
            const recur = {
                id: null,
                weekdays: filter(req.body.weekString),
                end: filter(req.body.endRecur)
            }
            recurInsertResults = await insert(recur, 'recurs', ['id', 'date'])
        }

        // Get logged in user
        const token = req.cookies.token
        const authData = await jwt.verify(token, 'secret-key')
        const userWhere = {
            username: authData.username
        }
        const userResults = await select('users', userWhere)

        // Insert event
        const event = {
            id: null,
            title: filter(req.body.title),
            date: filter(req.body.date),
            startTime: filter(req.body.start),
            endTime: filter(req.body.end),
            recur: recurInsertResults ? parseInt(filter(recurInsertResults.id)) : null,
            room: parseInt(filter(req.body.room)),
            user: parseInt(filter(userResults[0].id))
        }
        const insertResults = await insert(event, 'events', ['id', 'date', 'startTime', 'endTime'])
        res.json({ results: insertResults })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Update an event
router.post('/update', async (req, res) => {
    try {
        // Input validation
        if(!req.body.id || !req.body.title || !req.body.date
            || !req.body.start || !req.body.end || !req.body.room) {
                throw new Error('Please fill out the entire update event form')
        } 

        // Validate availibility
        const cols = [
            'events.id',
            'events.title',
            'events.date',
            'events.startTime',
            'events.endTime',
            'buildings.name',
            'rooms.number',
            'events.room',
            'recurs.end',
            'recurs.weekdays',
            'recurs.id AS recurId'
        ]
        const join = [
            {
                'join': 'rooms',
                'events.room': 'rooms.id'
            },
            {
                'join': 'buildings',
                'rooms.building': 'buildings.id'
            },
            {
                'left join': 'recurs',
                'events.recur': 'recurs.id'
            }
        ]
        const date = new Date(`${req.body.date}T00:00:01`)
        const matchWeek = getWeekString(date.getDay())
        // For getting a regular event that overlap
        const where1 = {
            'events.date': filter(req.body.date),
            'room': parseInt(filter(req.body.room)),
            'startTime': filter(req.body.end),
            'endTime': filter(req.body.start),
        }
        const whereCompare1 = {
            'room': '!=',
            'startTime': '<',
            'endTime': '>'
        }
        const eventResults1 = await select('events', where1, 'AND', cols, join, whereCompare1, 'AND', true)
        // For gettings recurring events that overlap
        const where2 = {
            'events.date': filter(req.body.date),
            'room': parseInt(filter(req.body.room)),
            'recurs.weekdays': filter(matchWeek),
            'events.id': parseInt(filter(req.body.id)),
            'recurs.end': filter(req.body.date),
            'date': filter(req.body.date),
            'startTime': filter(req.body.start),
            'endTime': filter(req.body.end),
        }
        const whereCompare2 = {
            'room': '!=',
            'recurs.end': '>=',
            'date': '<=',
            'events.id': '!=',
            'startTime': '>',
            'endTime': '<'
        }
        const eventResults2 = await select('events', where2, 'AND', cols, join, whereCompare2, 'AND', true)
        const fullEventResults = eventResults1.concat(eventResults2)
        if(fullEventResults.length !== 0) {
            res.status(400).json({ msg: 'Room is unavailable during this time / date' })
            return
        }

        if(req.body.recurId && req.body.weekString && req.body.end) {
            // Update recur
            const recur = [{
                'recurs.id': parseInt(filter(req.body.recurId)),
                'recurs.weekdays': filter(req.body.weekString),
                'recurs.end': filter(req.body.endRecur)
            }]
            const recurInsertResults = await update(recur, 'recurs')
        }

        // Get logged in user
        const token = req.cookies.token
        const authData = await jwt.verify(token, 'secret-key')
        const userWhere = {
            username: authData.username
        }
        const userResults = await select('users', userWhere)

        // Update event
        const event = [{
            'id': parseInt(filter(req.body.id)),
            'title': filter(req.body.title),
            'date': filter(req.body.date),
            'startTime': filter(req.body.start),
            'endTime': filter(req.body.end),
            'recur': req.body.recurId ? parseInt(filter(req.body.recurId)) : null,
            'room': parseInt(filter(req.body.room)),
            'user': parseInt(filter(userResults[0].id))
        }]
        const results = await update(event, 'events')
        res.json({ results })
    } catch(err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Delete an event
router.post('/delete', async (req, res) => {
    try {
        // Input validation
        if(!req.body.id) {
            throw new Error('Please enter a valid event id to delete')
        }

        const results = await remove([parseInt(filter(req.body.id))], 'events', 'id')
        res.json({ results })
    } catch(err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

module.exports = router