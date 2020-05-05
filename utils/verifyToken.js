const jwt = require('jsonwebtoken')
const log = require('./log')

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token
        if(token){
            await jwt.verify(token, 'secret-key')
            next()
        } else {
            res.redirect('/login.html')
        }
    } catch (err) {
        log('error-log', err.toString())
        res.redirect('/login.html')
    }
}

module.exports = verifyToken