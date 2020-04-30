const mysqldump = require('mysqldump')

mysqldump({
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'root',
        database : 'rcs'
    },
    dumpToFile: '/media/pi/*/full-datebase.sql.gz',
    compressFile: true
});