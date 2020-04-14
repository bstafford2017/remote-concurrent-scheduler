const fs = require('fs')
const path = require('path')

// Middleware function
const logger = (req, res, next) => {
    const content = `[${req.method}] ${req.protocol}://${req.get('host')}${req.originalUrl}: ${new Date().toISOString().slice(0, 10)} @ ${new Date().toLocaleTimeString()} : ${req.body}`
    const targetPath = path.join('./logs', 'log.txt')
    // Save to log file
    if(fs.existsSync(targetPath)){
        fs.appendFile(targetPath, content + '\n', (err) => {if(err) throw err})
    } else {
        fs.mkdirSync('./logs')
        fs.writeFile(targetPath, content, (err) => {if(err) throw err})
    }
    next()
}

module.exports = logger