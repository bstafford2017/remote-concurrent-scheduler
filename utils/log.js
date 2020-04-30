const fs = require('fs')
const path = require('path')

const log = (file, content) => {
    const timeString = `[${new Date().toISOString().slice(0, 10)} @ ${new Date().toLocaleTimeString()}] : `
    const targetPath = path.join('./logs', file)
    if(fs.existsSync(targetPath)){
        fs.appendFile(targetPath, timeString + content + '\n', (err) => {if(err) throw err})
    } else {
        fs.writeFile(targetPath, timeString + content + '\n', (err) => {if(err) throw err})
    }
}

module.exports = log