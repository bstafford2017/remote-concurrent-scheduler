const connection = require('../database')
const filter = require('../filter')

function insert(obj, table_name) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${table_name} VALUES (`
        Object.values(obj).forEach((val, index, arr) => {
            if(filter(val) === '')
                reject('Invalid input entries')

            if(typeof val === 'string'){
                val = filter(val)
                if(arr.length - 1 === index)
                    sql += `'${val}')`
                else
                    sql += `'${val}', `
            } else { 
                if(arr.length - 1 === index)
                    sql += `${val})`
                else
                    sql += `${val}, `
            }
        })
        connection.query(sql, (err, results) => {
            if(err)
                reject(err.sqlMessage)
            else
                resolve(obj)
        })
    })
}

module.exports = insert