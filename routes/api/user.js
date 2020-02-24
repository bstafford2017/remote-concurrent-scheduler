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
    const username = req.body.username.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    const password = req.body.password;

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
/*router.post('/create', (req, res) => {
    const sql = "INSERT INTO users VALUES ('" + req.body.username + "', '" + 
    req.body.password + "', '" + req.body.buiding + "', " + req.body.date + ", " + 
    req.body.time + ", " + req.body.recur + ")"
    query(sql)
})*/

// Delete a user
/*router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM events WHERE title = '" + req.params.id + "', "
  query(sql)
})*/

module.exports = router