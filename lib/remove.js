const connection = require('../utils/database')
const log = require('../utils/log')
const isStr = require('../utils/isStr')

function remove(array, table_name, primary_key) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${table_name} WHERE `
        array.forEach((val, index, arr) => {
            if(arr.length - 1 === index)
                sql += `${primary_key} = ${(isStr(val)) ? `'${val}'` : `${val}`}`
            else 
                sql += `${primary_key} = ${(isStr(val)) ? `'${val}' OR ` : `${val} OR `}`
        })
        log('database-log.txt', sql)
        connection.query(sql, (err, results) => {
            if(err)
                reject(err)
            else
                resolve(array)
        })
    })
}

module.exports = remove