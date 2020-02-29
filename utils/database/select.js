const connection = require('../database')

function select(value_array, table_name, key_array){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table_name} `
        
        if(value_array && key_array){
            if(value_array.length === key_array.length)
                reject('Value array and key array are not the same length')

            value_array.forEach((value, index) => {
                if(index === value_array.length - 1)
                    sql += `WHERE ${key_array[index]} = ${value}`
                else
                    sql += `WHERE ${key_array[index]} = ${value} AND`
            })
        }

        connection.query(sql, (err, results) => {
            if(err)
                reject(err.sqlMessage)
            else
                resolve(results)
        })
    })
}

module.exports = select