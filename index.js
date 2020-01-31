const express = require('express')
const logger = require('./utils/logger')

const app = express()

// Middleware for logging requests
app.use(logger)

// Set static directory
app.use('/', express.static(__dirname + '/client'));

// Routes for API
app.use('/api/event', require('./routes/api/event'))

let port = process.env.PORT || 5000

// Listen for request
app.listen(port, () => console.log(`Server started on port ${port}`))

