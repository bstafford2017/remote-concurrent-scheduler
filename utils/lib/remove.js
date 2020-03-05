const connection = require('../database')
const filter = require('../filter')
const isStr = require('../isStr')

// change arrray to obj which will hold primary key and primary key value
function remove(array, table_name, primary_key) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${table_name} WHERE `
        array.forEach((val, index, arr) => {
            if(filter(val) === '')
                reject('Invalid input entries')

            if(arr.length - 1 === index)
                sql += `${primary_key} = ${(isStr(val)) ? `'${val}'` : `${val}`}`
            else 
                sql += `${primary_key} = ${(isStr(val)) ? `'${val}' OR ` : `${val} OR `}`
        })
        console.log(sql)
        connection.query(sql, (err, results) => {
            if(err)
                reject(err.sqlMessage)
            else
                resolve(array)
        })
    })
}

module.exports = remove