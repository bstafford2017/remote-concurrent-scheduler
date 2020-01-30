const express = require('express')
const logger = require('./utils/logger')

const app = express()

// Middleware for logging requests
app.use(logger)

// Middleware for body parsing uploaded files
app.use(fileupload())

// Routes for API
app.use('/api/event', require('./routes/api/event'))

let port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

