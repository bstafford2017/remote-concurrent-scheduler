const fs = require('fs')
const path = require('path')

function log(file, content) {
    const timeString = `[${new Date().toISOString().slice(0, 10)} @ ${new Date().toLocaleTimeString()}] : `
    const targetPath = path.join('./logs', file)
    // Save to log file
    if(fs.existsSync(targetPath)){
        fs.appendFile(targetPath, timeString + content + '\n', (err) => {if(err) throw err})
    } else {
        if(!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs')
        }
        fs.writeFile(targetPath, timeString + content + '\n', (err) => {if(err) throw err})
    }
}

module.exports = log