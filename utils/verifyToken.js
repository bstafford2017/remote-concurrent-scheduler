const jwt = require('jsonwebtoken')
const log = require('./log')

function verifyToken(req, res, next) {
    const token = req.cookies.token
    if(token){
        jwt.verify(token, 'secret-key', (err, authData) => {
            if(err) {
                log('error-log', err.toString())
                res.redirect('/login.html')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login.html')
    }
}

module.exports = verifyToken