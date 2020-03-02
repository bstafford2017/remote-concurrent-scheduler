const connection = require('../database')

function isStr(obj){
    return typeof obj === 'string'
}

// join_obj = {
//     table1: table1,
//     join_key1: join_value1,
//     ...
// }
// NOTE: Assumes no ambigious names
function select(table_name, where_obj, where_connective, table_columns, join_obj){
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table_name} `
        
        if(join_obj && table_columns){
            Object.keys(join_obj).forEach((key, index) => {
                const val = join_obj[key]
                if(index % 2 === 0){
                    sql += `JOIN ${val} ON `
                } else {
                    sql += `${key} = ${table_columns[index - 1]} `
                }
            })
        }
        if(where_obj){
            sql += `WHERE `
            Object.keys(where_obj).forEach((key, index, arr) => {
                const val = where_obj[key]
                if(arr.length - 1 === index)
                    sql += `${key} = ${(isStr(val)) ? `'${val}'` : `${val}`}`
                else 
                    sql += `${key} = ${(isStr(val)) ? `'${val}'` : `${val}`} ${where_connective} `
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