const express = require('express')
const jwt = require('jsonwebtoken')
const filter = require('../../utils/filter')
const con = require('../../utils/database')
const select = require('../../utils/lib/select')
const insert = require('../../utils/lib/insert')
const remove = require('../../utils/lib/remove')
const router = express.Router()

// Get all users
router.get('/', (req, res) => {
    select('users').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Check if user is admin
router.get('/admin', (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, 'secret-key', (err, authData) => {
        if(err) {
            console.log(err) 
            return res.redirect('login.html')
        }

        const sql = `SELECT * FROM users WHERE username = '${authData.username}';`

        con.query(sql, (err, result) => {
            if(err)
                res.status(400).json({ msg: err })

            if(result.length === 0)
                return res.redirect('login.html')
            
            if(result[0].admin === 1) {
                res.json({ admin: 'true'})
            } else {
                res.json({ admin: 'false'}) 
            }
        })
    })
})

// Get particular user
router.post('/login', (req, res) => {
    const username = filter(req.body.username)
    const password = req.body.password

    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`

    con.query(sql, (err, result) => {
        if(err)
            return res.status(400).json({ msg: err })

        if(result.length === 0)
            return res.redirect('login.html')

        if(result[0].username === req.body.username && result[0].password === req.body.password) {
            jwt.sign({username: req.body.username}, 'secret-key', { expiresIn: '24h' }, (err, token) => {
                if(err) 
                    return res.status(400).json({ msg: err })

                res.json({ token })
            })
        } else {
            return res.status(400).json({ msg: 'Invalid username/password' })
        }
    })
})

// Create a user
router.post('/create', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        admin: parseInt(req.body.admin),
        fname: req.body.fname,
        lname: req.body.lname
    }
    insert(user, 'users').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Update a user
router.post('/update', (req, res) => {
    const user = [{
        oldUsername: req.body.oldUsername,
        newUsername: req.body.newUsername,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        admin: parseInt(req.body.admin)
    }]
    remove(user, 'users', 'username').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Delete a user
router.post('/delete', (req, res) => {
    const usernames = [req.body.username]
    remove(usernames, 'users', 'username').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

module.exports = router