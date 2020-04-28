const fs = require('fs')
const path = require('path')

const log = (file, content) => {
    const targetPath = path.join('./logs', file)
    if(fs.existsSync(targetPath)){
        fs.appendFile(targetPath, content + '\n', (err) => {if(err) throw err})
    } else {
        fs.writeFile(targetPath, content + '\n', (err) => {if(err) throw err})
    }

}

module.exports = log