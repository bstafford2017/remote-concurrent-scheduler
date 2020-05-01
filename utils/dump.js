const mysqldump = require('mysqldump')
const log = require('./log')

function dump() {
    try {
        mysqldump({
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : 'root',
                database : 'rcs'
            },
            dumpToFile: '/media/pi/*/full-datebase.sql.gz',
            compressFile: true
        })
    } catch(err) {
        log('error-log.txt', err)
    }
}

module.exports = dump