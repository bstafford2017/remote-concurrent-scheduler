const express = require('express')
const jwt = require('jsonwebtoken')
const query = require('../../utils/query')
const con = require('../../utils/database')
const router = express.Router()

// Get all users
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users'
  query(sql, res)
})

// Check if user is admin
router.get('/admin', (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, 'secret-key', (err, authData) => {
        if(err) {
            console.log(err) 
            res.redirect('login.html')
        }

        const sql = `SELECT * FROM users WHERE username = '${authData.username}';`

        con.query(sql, (err, result) => {
            if(err)
                throw err

            if(result.length === 0)
                return res.sendStatus(400)
            
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
    const username = req.body.username.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    const password = req.body.password

    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`

    con.query(sql, (err, result) => {
        if(err)
            throw err

        if(result.length === 0)
            return res.sendStatus(400)

        if(result[0].username === req.body.username && result[0].password === req.body.password) {
            jwt.sign({username: req.body.username}, 'secret-key', { expiresIn: '24h' }, (err, token) => {
                if(err) 
                    throw err
                res.json({ token })
            })
        } else {
            return res.sendStatus(400)
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
    if(!user.username || !user.password || !user.fname || !user.lname || typeof user.admin === 'undefined')
        return res.sendStatus(400)
    const sql = `INSERT INTO users VALUES ('${user.username}', '${user.password}', 
        ${user.admin}, '${user.fname}', '${user.lname}')`
    con.query(sql, (err, result) => {
        if(err)
            throw err
    })
})

// Update a user
router.post('/update', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        admin: parseInt(req.body.admin)
    }
    if(!user.username || !user.password || !user.fname || !user.lname || typeof user.admin === 'undefined')
        return res.sendStatus(400)
    const sql = `UPDATE users SET password = '${user.password}', admin = ${user.admin}, f_name = '${user.fname}', l_name = '${user.lname}' WHERE username = '${user.username}'`
    con.query(sql, (err, result) => {
        if(err)
            throw err
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