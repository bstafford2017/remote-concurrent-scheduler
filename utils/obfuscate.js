const fs = require('fs')
const path = require('path')
const obfuscator = require('javascript-obfuscator')

function obfuscate(req, res, next) {
    fs.readFile(__dirname + '/../public/js' + req.url, 'UTF-8', (err, data) => {
        if(err)
            throw err
        const result = obfuscator.obfuscate(data)
        res.send(result.getObfuscatedCode())
    })
}
module.exports = obfuscate