const mysqldump = require('mysqldump')
const fs = require('fs')
const log = require('./log')

async function dump() {
    try {
        await mysqldump({
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : 'root',
                database : 'rcs'
            },
            dumpToFile: 'logs/full-database.gz',
            compressFile: true
        })
    } catch(err) {
        log('error-log', err.toString(), true)
    }
}

module.exports = dump