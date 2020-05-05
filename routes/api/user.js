const express = require('express')
const jwt = require('jsonwebtoken')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const filter = require('../../utils/filter')
const log = require('../../utils/log')
const router = express.Router()

// Get particular user
router.post('/', async (req, res) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.redirect('/login.html')
        }
        const jwtResults = await jwt.verify(token, 'secret-key')
        if(!jwtResults) {
            return res.redirect('/login.html')
        }
        const where = {
            username: filter(jwtResults.username)
        }
        const results = await select('users', where)
        res.json({ results: results[0] })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})


// Get all users
router.get('/', async (req, res) => {
    try {
        const results = await select('users')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Check if user is admin
router.get('/admin', async (req, res) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.redirect('/login.html')
        }

        const verifyResults = await jwt.verify(token, 'secret-key')
        if(!verifyResults) {
            return res.redirect('/login.html')
        } 
        const where = {
            username: filter(verifyResults.username)
        }
        const results = await select('users', where)
        if(results.length === 0) {
            return res.redirect('/login.html')
        }
        if(results[0].admin === 1) {
            res.json({ admin: 'true'})
        } else {
            res.json({ admin: 'false'}) 
        }
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Get particular user
router.post('/login', async (req, res) => {
    try {
        // Input validation
        if(!req.body.username || !req.body.password) {
            throw new Error('Please fill out the entire login form')
        }

        const where = {
            username: filter(req.body.username),
            password: filter(req.body.password)
        }
        const results = await select('users', where, 'AND')
        if(results.length === 0) {
            res.status(400).json({ msg: 'Invalid username or password' })            
        }

        if(results[0].username === req.body.username && results[0].password === req.body.password) {
            jwt.sign({username: where.username}, 'secret-key', { expiresIn: '24h' }, (err, token) => {
                if(err) {
                    console.log(err)
                    res.status(400).json({ msg: err.toString() })
                } else {
                    res.json({ token })
                }
            })
        } else {
            return res.status(400).json({ msg: 'Invalid username/password' })
        }
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Create a user
router.post('/create', async (req, res) => {
    try {
        // Input validation
        if(!req.body.username || !req.body.password || !req.body.fname
            || !req.body.lname || !req.body.admin) {
            throw new Error('Please fill out the entire create user form')
        }

        const user = {
            id: null,
            username: filter(req.body.username),
            password: filter(req.body.password),
            fname: filter(req.body.fname),
            lname: filter(req.body.lname),
            admin: parseInt(filter(req.body.admin)),
        }
        const results = await insert(user, 'users')
        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Update a user
router.post('/update', async (req, res) => {
    try {
        // Input validation
        if(!req.body.id || !req.body.username || !req.body.password
            || !req.body.fname || !req.body.lname || !req.body.admin) {
            throw new Error('Please fill out the entire update user form')
        }

        const user = [{
            id: parseInt(filter(req.body.id)),
            username: filter(req.body.username),
            password: filter(req.body.password),
            fname: filter(req.body.fname),
            lname: filter(req.body.lname),
            admin: parseInt(filter(req.body.admin)),
        }]
        const results = await update(user, 'users')

        // If < 1 admin, create an admin
        const adminWhere = {
            'admin': '1'
        }
        const adminResults = await select('users', adminWhere)
        if(adminResults.length < 1) {
            const admin = {
                id: null,
                username: 'admin',
                password: 'Scheduler2019',
                fname: 'admin',
                lname: 'admin',
                admin: 1,
            }
            results = results.concat(await insert(admin, 'users'))
        }

        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

// Delete a user
router.post('/delete', async (req, res) => {
    try {
        // Input validation
        if(!req.body.id) {
            throw new Error('Please enter a valid user id to delete')
        }

        // Check if deleting logged in account
        const token = req.cookies.token
        let tokenResults = {}
        if(token){
            const results = await jwt.verify(token, 'secret-key')
            const userWhere = {
                username: results.username
            }
            tokenResults = await select('users', userWhere)
        }
        if(req.body.id == tokenResults[0].id) {
            throw new Error('Cannot delete logged in account')
        }

        // Check if user has create events
        const eventsWhere = {
            'users.id': parseInt(filter(req.body.id))
        }
        const eventsJoin = [
            {
                'join': 'events',
                'events.user': 'users.id'
            }
        ]
        const eventsResults = await select('users', eventsWhere, 'AND', ['users.id'], eventsJoin)
        console.log(JSON.stringify(eventsResults) + ' ' + req.body.id)
        if(eventsResults.length > 0) {
            throw new Error('Cannot delete user with created events')
        }


        const id = [parseInt(filter(req.body.id))]
        const results = await remove(id, 'users', 'id')

        // If < 1 admin, create an admin
        const adminWhere = {
            'admin': '1'
        }
        const adminResults = await select('users', adminWhere)
        if(adminResults.length < 1) {
            const admin = {
                id: null,
                username: 'admin',
                password: 'Scheduler2019',
                fname: 'admin',
                lname: 'admin',
                admin: 1,
            }
            results = results.concat(await insert(admin, 'users'))
        }

        res.json({ results })
    } catch (err) {
        log('error-log', err.toString() + '\n')
        res.status(400).json({ msg: err.toString() })
    }
})

module.exports = router