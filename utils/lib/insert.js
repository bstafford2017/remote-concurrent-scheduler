const connection = require('../database')
const filter = require('../filter')

function insert(obj, table_name) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${table_name} VALUES (`
        Object.values(obj).forEach((val, index, arr) => {
            if(typeof val === 'string'){
                // Escape string
                if((val = filter(val)) === '' || typeof val === 'undefined')
                    reject('Invalid input entries')

                if(arr.length - 1 === index)
                    sql += `'${val}')`
                else
                    sql += `'${val}', `
            } else {
                if(typeof val === 'undefined')
                    reject('Invalid input entries')

                if(arr.length - 1 === index)
                    sql += `${val})`
                else
                    sql += `${val}, `
            }
        })
        console.log(sql)
        connection.query(sql, (err, results) => {
            if(err)
                reject(err.sqlMessage)
            else
                resolve(obj)
        })
    })
}

module.exports = insert