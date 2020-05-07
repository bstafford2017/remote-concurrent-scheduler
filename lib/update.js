const connection = require('../utils/database')
const log = require('../utils/log')
const isStr = require('../utils/isStr')

// NOTE: Assumes first element is primary key
function update(obj_array, table_name){
    return new Promise((resolve, reject) => {
        obj_array.forEach(obj => {
            let topHalf = `UPDATE ${table_name} SET `
            let bottomHalf = ``
            Object.keys(obj).forEach((key, index, arr) => {
                let val = obj[key]
                if(index === 0){
                    if(typeof key === 'string')
                        bottomHalf += ` WHERE ${key} = '${val}'`
                    else
                        bottomHalf += ` WHERE ${key} = ${val}`
                }
                if(arr.length - 1 === index)
                    topHalf += `${key} = ${(isStr(val)) ? `'${val}'` : `${val}`}`
                else 
                    topHalf += `${key} = ${(isStr(val)) ? `'${val}', ` : `${val}, `}`
            })
            log('database-log.txt', topHalf + bottomHalf)
            connection.query(topHalf + bottomHalf, (err, results) => {
                if(err)
                    reject(err)
                else
                    resolve(obj_array)
            })
        })
    })
}

module.exports = update