const express = require('express')
const jwt = require('jsonwebtoken')
const parser = require('cookie-parser')
const logger = require('./utils/logger')
const verifyToken = require('./utils/verifyToken')

const app = express()

// Middleware for logging requests
app.use(logger)

// Middleware for cookie passing
app.use(parser())

// Middleware for verifying token
app.use('/calendar.html', verifyToken)

// Static directories for dependencies
app.use('/', express.static(__dirname + '/client/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
app.use('/bootstrapjs', express.static(__dirname + '/node_modules/bootstrap/dist/js/'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'))

app.post('/api/login', (req, res) => {
    // Send signed JWT token
    jwt.sign({username: req.username}, 'secret-key', { expiresIn: '24h' }, (err, token) => {
        if(err) 
            res.sendStatus(500)
        else 
            res.json({ token })
    })
})

//localStorage.setItem('token', token)
//localStorage.getItem('token')

// Routes for API
app.use('/api/event', require('./routes/api/event'))

let port = process.env.PORT || 5000

// Listen for request
app.listen(port, () => console.log(`Server started on port ${port}`))

