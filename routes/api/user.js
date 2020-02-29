const express = require('express')
const jwt = require('jsonwebtoken')
const sendJSONResultBack = require('../../utils/query')
const con = require('../../utils/database')
const filter = require('../../utils/filter')
const router = express.Router()

// Get all users
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users'
  sendJSONResultBack(sql, res)
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
        fname: req.body.fname,
        lname: req.body.lname,
        admin: parseInt(req.body.admin)
    }

    if(Object.values(user).some(field => (Number.isInteger(field)) ? false : !filter(field)))
        return res.status(400).json({ msg: 'Invalid create value(s)' })
        
    const sql = `INSERT INTO users VALUES ('${user.username}', '${user.password}', 
        ${user.admin}, '${user.fname}', '${user.lname}')`
    con.query(sql, (err, result) => {
        if(err)
            return res.status(400).json({ msg: err })
    })
})

// Update a user
router.post('/update', (req, res) => {
    const user = {
        oldUsername: req.body.oldUsername,
        newUsername: req.body.newUsername,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        admin: parseInt(req.body.admin)
    }

    if(Object.values(user).some(field => (Number.isInteger(field)) ? !admin : !filter(field)))
        return res.status(400).json({ msg: 'Invalid update value(s)' })
    
    // Delete old username since it was the primary key
    const sql = `DELETE FROM users WHERE username = '${user.oldUsername}'`
    con.query(sql, (err, result) => {
        if(err)
            res.status(400).json({ msg: err })    
    })
    sql = `INSERT INTO users VALUES ('${user.newUsername}', '${user.password}', 
            ${user.admin}, '${user.fname}', '${user.lname}')`
    con.query(sql, (err, result) => {
        if(err)
            res.status(400).json({ msg: err })
        else 
            res.json({ username, password, admin, fname, lname })
    })
})

// Delete a user
router.post('/delete', (req, res) => {
    const usernames = req.body.usernames
    if(typeof usernames !== 'undefined'){
        usernames.forEach(username => {
            const deleteBuilding = `DELETE FROM users WHERE username = '${username}'`
            con.query(deleteBuilding, (err, result) => {
                if(err)
                    throw err
            })
        })
        res.json({ usernames })
    } else {
        res.sendStatus(400)
    }
})

module.exports = router