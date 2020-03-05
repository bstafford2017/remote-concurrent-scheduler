const min = require('minify')

function minify(req, res, next) {
    min(__dirname + '/../public/js' + req.url).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
}
module.exports = minify