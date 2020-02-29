const connection = require('../database')
const filter = require('../filter')

// NOTE: Assumes old... and new... elements are included
function update(obj_array, table_name, table_columns, table_pk){
    return new Promise((resolve, reject) => {
        let topHalf = `UPDATE ${table_name} SET `
        let bottomHalf = ``
        let hasOldFieldBeenHit = false

        obj_array.forEach(obj => {
            Object.keys(obj).forEach((key, index, arr) => {
                let val = obj[key]

                if(filter(val) === '')
                    reject('Invalid input entries')

                // Set WHERE to the old primary key
                // "Skip" the old attribute in SET
                if(key.includes('old')){
                    if(typeof table_pk === 'string'){
                        bottomHalf += ` WHERE ${table_pk} = '${val}'`
                    } else {
                        bottomHalf += ` WHERE ${table_pk} = ${val}`
                    }
                    hasOldFieldBeenHit = true
                } else {
                    if(hasOldFieldBeenHit)
                        index--

                    if(typeof val === 'string'){
                        val = filter(val)
                        if(arr.length - 2 === index)
                            topHalf += `${table_columns[index]} = '${val}'`
                        else
                            topHalf += `${table_columns[index]} = '${val}', `
                    } else {
                        if(arr.length - 2 === index)
                            topHalf += `${table_columns[index]} = ${val}`
                        else
                            topHalf += `${table_columns[index]} = ${val}, `
                    }
                }
            })
        })
        connection.query(topHalf + bottomHalf, (err, results) => {
            if(err)
                reject(err.sqlMessage)
            else
                resolve(obj_array)
        })
    })
}

module.exports = update