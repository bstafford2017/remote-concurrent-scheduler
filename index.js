const express = require('express')
const logger = require('./utils/logger')
const path = require('path')

const app = express()

// Middleware for logging requests
app.use(logger)

// Set static directories
app.use('/', express.static(__dirname + '/client'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
app.use('/bootstrapjs', express.static(__dirname + '/node_modules/bootstrap/js/dist/'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'))

// Routes for API
app.use('/api/event', require('./routes/api/event'))

let port = process.env.PORT || 5000

// Listen for request
app.listen(port, () => console.log(`Server started on port ${port}`))

