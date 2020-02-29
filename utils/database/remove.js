const connection = require('../database')
const filter = require('../filter')

function remove(array, table_name, primary_key) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${table_name} WHERE `
        array.forEach((val, index, arr) => {
            if(filter(val) === '')
                reject('Invalid input entries')

            if(typeof val === 'string'){
                val = filter(val)
                if(arr.length - 1 === index)
                    sql += `${primary_key} = '${val}'`
                else
                    sql += `${primary_key} = '${val}' OR `
            } else {
                if(arr.length - 1 === index)
                    sql += `${primary_key} = ${val})`
                else
                    sql += `${primary_key} = ${val} OR `
            }
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