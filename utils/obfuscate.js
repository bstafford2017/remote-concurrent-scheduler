const fs = require('fs')
const obfuscator = require('javascript-obfuscator')
const { exec } = require('child_process');
const log = require('./log')

function shell(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if(err)
                throw err;
            resolve(stdout ? stdout : stderr);
        });
    })
}

async function obfuscate(req, res, next) {
    // NOTE: This does NOT work with nodemon
    /*if(!fs.existsSync(__dirname + '/../obfuscate')) {
        try {
            console.log(await shell('npm run obfuscate'))
        } catch(err) {
            log('error-log', err.toString() + '\n')
        }
    }
    fs.readFile(__dirname + '/../obfuscate' + req.url, 'UTF-8', (err, data) => {
        if(err)
            log('error-log', err.toString() + '\n')
        res.send(data)
    })*/
    // ONLY FOR DEV!!!
    fs.readFile(__dirname + '/../public/js' + req.url, 'UTF-8', (err, data) => {
        if(err)
            throw err
        const result = obfuscator.obfuscate(data)
        res.send(result.getObfuscatedCode())
    })

}
module.exports = obfuscate