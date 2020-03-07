const connection = require('../utils/database')
const select = require('./select')
const filter = require('../utils/filter')
const isStr = require('../utils/isStr')

function insert(obj, table_name, avoid_filter) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${table_name} VALUES (`
        Object.keys(obj).forEach((key, index, arr) => {
            let val = obj[key]

            // Escape string
            if(avoid_filter){
                if(avoid_filter[index] === key){
                    
                }
            } else {
                if(isStr(val) && key !== 'id'){
                    if((val = filter(val)) === '' || typeof val === 'undefined')
                        reject('Invalid input entries')
                }
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
                const selectObj = {}
                Object.keys(obj).forEach(key => {
                    if(obj[key])
                        selectObj[key] = obj[key]
                })
                select(table_name, selectObj, 'AND').then(results => {
                    resolve(results[0])
                }).catch(err => {
                    reject(err)
                })
            }
        })
    })
}

module.exports = insert