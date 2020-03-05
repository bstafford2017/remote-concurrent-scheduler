const fs = require('fs')

function obfuscate(req, res, next) {
    fs.readFile(__dirname + '/obfuscate/' + req.url, 'UTF-8', (err, data) => {
        if(err)
            throw err
        res.send(data)
    })
}
module.exports = obfuscate