const connection = require('../database')

function select(table_name, key_array, value_array){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table_name} `

        if(arguments.length === 3 && value_array && key_array){
            sql += `WHERE `
            if(value_array.length == key_array.length)
                reject('Value array and key array are not the same length')

            value_array.forEach((value, index) => {
                if(typeof val === 'string'){
                    if(arr.length - 1 === index)
                        sql += `${key_array[index]} = ${value}`
                    else
                        sql += `${key_array[index]} = ${value} AND `
                } else { 
                    if(arr.length - 1 === index)
                        sql += `${key_array[index]} = ${value}`
                    else
                        sql += `${key_array[index]} = ${value} AND `
                }
            })
        }
        console.log(sql)
        connection.query(sql, (err, results) => {
            if(err)
                reject(err.sqlMessage)
            else
                resolve(results)
        })
    })
}

module.exports = select