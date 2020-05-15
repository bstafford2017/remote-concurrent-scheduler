const mysqldump = require('mysqldump')
const fs = require('fs')
const log = require('./log')

async function dump() {
    try {
        const piPath = 'media/pi/*/full-database.gz'
        await mysqldump({
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : 'root',
                database : 'rcs'
            },
            dumpToFile: (fs.existsSync(piPath)) ? piPath : 'logs/full-database.gz',
            compressFile: true
        })
    } catch(err) {
        log('error-log', err.toString(), true)
    }
}

module.exports = dump