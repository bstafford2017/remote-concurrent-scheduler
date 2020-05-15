const fs = require('fs')
const path = require('path')
const dump = require('./dump')

function log(file, content, noDump) {
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

    // If dump function has an error and logs it 
    if(typeof noDump === 'undefined') {
        dump()
    }
}

module.exports = log