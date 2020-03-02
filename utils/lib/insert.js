const connection = require('../database')
const select = require('../../utils/lib/select')
const filter = require('../filter')

function isStr(obj){
    return typeof obj === 'string'
}

function insert(obj, table_name) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${table_name} VALUES (`
        Object.keys(obj).forEach((key, index, arr) => {
            let val = obj[key]

            // Escape string
            if(isStr(val) && key !== 'id'){
                if((val = filter(val)) === '' || typeof val === 'undefined')
                    reject('Invalid input entries')
            }
            if(arr.length - 1 === index)
                sql += (isStr(val)) ? `'${val}')` : `${val})`
            else 
                sql += (isStr(val)) ? `'${val}', ` : `${val}, `
        })
        console.log(sql)
        connection.query(sql, (err, results) => {
            if(err){
                reject(err.sqlMessage)
            } else {
                if(Object.keys(obj).some(key => key === 'id'))
                    delete obj.id
                select(table_name, obj, 'AND').then(results => {
                    resolve(results[0])
                }).catch(err => {
                    reject(err)
                })
            }
        })
    })
}

module.exports = insert