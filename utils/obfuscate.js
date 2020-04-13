const fs = require('fs')
const obfuscator = require('javascript-obfuscator')
const { exec } = require('child_process');

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
    if(!fs.existsSync(__dirname + '/../obfuscate')) {
        try {
            console.log('starting shell cmd')
            await shell('npm run obfuscate')
            console.log('ending shell cmd')
        } catch(err) {
            throw err
        }
    }
    console.log('reading file')
    fs.readFile(__dirname + '/../obfuscate' + req.url, 'UTF-8', (err, data) => {
        if(err)
            throw err
        res.send(data)
    })
    // ONLY FOR DEV!!!
    // fs.readFile(__dirname + '/../public/js' + req.url, 'UTF-8', (err, data) => {
    //     if(err)
    //         throw err
    //     const result = obfuscator.obfuscate(data)
    //     res.send(result.getObfuscatedCode())
    // })

}
module.exports = obfuscate