const express = require('express')
const jwt = require('jsonwebtoken')
const filter = require('../../utils/filter')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const router = express.Router()

// Get particular user
router.post('/', async (req, res) => {
    const token = req.cookies.token
    const jwtResults = jwt.verify(token, 'secret-key', (err, authData) => {
        if(err) {
            console.log(err) 
            res.redirect('/login.html')
        }
        const where = {
            username: authData.username
        }
        select('users', where).then(results => {
            res.json({ results: results[0] })
        }).catch(err => {
            res.status(400).json({ msg: err.toString() })
        })
    })
})


// Get all users
router.get('/', async (req, res) => {
    try {
        const results = await select('users')
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// Check if user is admin
router.get('/admin', (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, 'secret-key', (err, authData) => {
        if(err || !authData.username) {
            console.log(err) 
            return res.redirect('/login.html')
        }
        const where = {
            username: authData.username
        }
        select('users', where).then(results => {
            if(results.length === 0)
                return res.redirect('/login.html')
        
            if(results[0].admin === 1) {
                res.json({ admin: 'true'})
            } else {
                res.json({ admin: 'false'}) 
            }
        }).catch(err => {
            res.status(400).json({ msg: err.toString() })
        })
    })
})

// Get particular user
router.post('/login', (req, res) => {
    const where = {
        username: filter(req.body.username),
        password: req.body.password
    }
    select('users', where, 'AND').then(results => {
        if(results.length === 0)
            return redirect('login.html')

        if(results[0].username === req.body.username && results[0].password === req.body.password) {
            jwt.sign({username: where.username}, 'secret-key', { expiresIn: '24h' }, (err, token) => {
                if(err) 
                    res.status(400).json({ msg: err.toString() })
                else
                    res.json({ token })
            })
        } else {
            return res.status(400).json({ msg: 'Invalid username/password' })
        }
    }).catch(err => {
        res.status(400).json({ msg: err.toString() })
    })
})

// Create a user
router.post('/create', async (req, res) => {
    try {
        const user = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            fname: req.body.fname,
            lname: req.body.lname,
            admin: parseInt(req.body.admin),
        }
        const results = await insert(user, 'users')
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// Update a user
// ** change to update function
router.post('/update', async (req, res) => {
    try {
        const user = [{
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            fname: req.body.fname,
            lname: req.body.lname,
            admin: parseInt(req.body.admin),
        }]
        const results = await update(user, 'users')
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// Delete a user
router.post('/delete', async (req, res) => {
    try {
        const id = [req.body.id]
        const results = await remove(id, 'users', 'id')
        res.json({ results })
    } catch (err) {
        res.status(400).json({ msg: err.toString() })
    }
})

/*
create table users (
    id int not null auto_increment,
    username varchar(55) not null unique,
    password varchar(55) not null,
    fname varchar(55) not null,
    lname varchar(55) not null,
    admin boolean not null,
    primary key(id));
*/

module.exports = router