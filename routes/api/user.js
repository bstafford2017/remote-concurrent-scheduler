const express = require('express')
const jwt = require('jsonwebtoken')
const filter = require('../../utils/filter')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
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
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
    }
})


// Get all users
router.get('/', async (req, res) => {
    try {
        const results = await select('users')
        res.json({ results })
    } catch (err) {
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
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
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
    }
})

// Get particular user
router.post('/login', async (req, res) => {
    try {
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
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
    }
})

// Create a user
router.post('/create', async (req, res) => {
    try {
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
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
    }
})

// Update a user
// ** change to update function
router.post('/update', async (req, res) => {
    try {
        const user = [{
            id: parseInt(filter(req.body.id)),
            username: filter(req.body.username),
            password: filter(req.body.password),
            fname: filter(req.body.fname),
            lname: filter(req.body.lname),
            admin: parseInt(filter(req.body.admin)),
        }]
        const results = await update(user, 'users')
        res.json({ results })
    } catch (err) {
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
    }
})

// Delete a user
router.post('/delete', async (req, res) => {
    try {
        const id = [parseInt(filter(req.body.id))]
        const results = await remove(id, 'users', 'id')
        res.json({ results })
    } catch (err) {
        log('error-log', err + '\n')
        res.status(400).json({ msg: err })
    }
})

module.exports = router