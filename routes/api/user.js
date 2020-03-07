const express = require('express')
const jwt = require('jsonwebtoken')
const filter = require('../../utils/filter')
const insert = require('../../lib/insert')
const remove = require('../../lib/remove')
const select = require('../../lib/select')
const update = require('../../lib/update')
const router = express.Router()

// Get particular user
router.post('/', (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, 'secret-key', (err, authData) => {
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
            res.status(400).json({ msg: err })
        })
    })
})


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
            res.status(400).json({ msg: err })
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
                    res.status(400).json({ msg: err })
                else
                    res.json({ token })
            })
        } else {
            return res.status(400).json({ msg: 'Invalid username/password' })
        }
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Create a user
router.post('/create', (req, res) => {
    const user = {
        id: null,
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        admin: parseInt(req.body.admin),
    }
    insert(user, 'users').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Update a user
// ** change to update function
router.post('/update', (req, res) => {
    const user = [{
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        admin: parseInt(req.body.admin),
    }]
    update(user, 'users').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
})

// Delete a user
router.post('/delete', (req, res) => {
    const id = [req.body.id]
    remove(id, 'users', 'id').then(results => {
        res.json({ results })
    }).catch(err => {
        res.status(400).json({ msg: err })
    })
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