const fs = require('fs')

function redirect(path, res){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) 
            throw err
        res.send(data)
    })
}

module.exports = redirect