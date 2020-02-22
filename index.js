const express = require('express')
const parser = require('cookie-parser')
const logger = require('./utils/logger')
const verifyToken = require('./utils/verifyToken')
const obfuscate = require('./utils/obfuscate')

const app = express()

// Middleware for body parsing
app.use(express.urlencoded({extended: true}));

// Middleware for parsing JSON
app.use(express.json());

// Middleware for logging requests
app.use(logger)

// Middleware for cookie passing
app.use(parser())

// Middleware for verifying token
app.use('/calendar.html', verifyToken)

// Middleware for obfuscating javascript
app.use('/js', obfuscate)

// Static directories for dependencies
app.use('/', express.static(__dirname + '/public/', {index: 'login.html'}));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
app.use('/bootstrapjs', express.static(__dirname + '/node_modules/bootstrap/dist/js/'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'))

// Routes for API
app.use('/api/event', require('./routes/api/event'))
app.use('/api/user', require('./routes/api/user'))

// Catch 404
app.use((req, res, next) => {
    res.redirect('error.html')
})


let port = process.env.PORT || 5000

// Listen for request
app.listen(port, () => console.log(`Server started on port ${port}`))

