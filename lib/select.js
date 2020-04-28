const connection = require('../utils/database')
const isStr = require('../utils/isStr')

// NOTE: Assumes no ambigious names
function select(table_name, where_obj, where_connective, table_columns, 
    join_obj, where_compare, compare_connective, overwrite_case){
    return new Promise((resolve, reject) => {
        let sql = `SELECT `
        if(table_columns){
            table_columns.forEach((col, index, arr) => {
                sql += (arr.length - 1 === index) ? `${col}` : `${col}, `
            })
        } else {
            sql += `*`
        }
        sql += ` FROM ${table_name} `
        if(join_obj){
            join_obj.forEach(join => {
                Object.keys(join).forEach((key, index) => {
                    const val = join[key]
                    if(index % 2 === 0){
                        sql += `${key} ${val} ON `
                    } else {
                        sql += `${val} = ${key} `
                    }
                })
            })
        }
        if(where_obj){
            sql += `WHERE `
            Object.keys(where_obj).forEach((key, index, arr) => {
                const val = where_obj[key]
                let keyInWhereCompare = false
                if(where_compare) {
                    Object.keys(where_compare).forEach((compareKey) => {
                        const compareValue = where_compare[compareKey]
                        if(key === compareKey) {
                            keyInWhereCompare = true
                            if(arr.length - 1 === index)
                                if(isStr(val)) {
                                    sql += (val.includes('-') || val.includes('_') || val.includes(':')) ? 
                                        `${key} ${compareValue} '${val}'` : 
                                        `${key} ${compareValue} '%${val}%'`
                                } else {
                                    sql += `${key} ${compareValue} ${val}`
                                }
                            else
                                if(isStr(val)) {
                                    sql += (val.includes('-') || val.includes('_') || val.includes(':')) ? 
                                        `${key} ${compareValue} '${val}' ${compare_connective} ` :
                                        `${key} ${compareValue} '%${val}%' ${compare_connective} `
                                } else {
                                    sql += `${key} ${compareValue} ${val} ${compare_connective} `
                                }
                        }
                    })
                }
                if(!keyInWhereCompare) {
                    if(arr.length - 1 === index)
                        if(isStr(val)) {
                            sql += (val.includes('-') || val.includes('_')) ? 
                                `${key} LIKE '${val}'` :
                                `${key} LIKE '%${val}%'`
                        } else {
                            sql += `${key} = ${val}`
                        }
                    else
                        if(isStr(val)) {
                            // Special case!
                            if(key === 'recurs.weekdays' && overwrite_case){
                                sql += `${key} LIKE '${val}' AND `
                            } else {
                                sql += (val.includes('-') || val.includes('_')) ? `${key} LIKE '${val}' ${where_connective} ` :
                                    `${key} LIKE '%${val}%' ${where_connective} `
                            }
                        } else {
                            sql += `${key} = ${val} ${where_connective} `
                        }
                    
                }
            })
        }
        console.log(sql)
        connection.query(sql, (err, results) => {
            if(err)
                reject(err)
            else
                resolve(results)
        })
    })
}

module.exports = select