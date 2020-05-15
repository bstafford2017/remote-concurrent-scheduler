const jwt = require('jsonwebtoken')
const log = require('./log')
const select = require('../lib/select')

async function verifyAdmin(req, res, next) {
    try {
        const token = req.cookies.token
        if(token){
            const verifyToken = await jwt.verify(token, 'secret-key')
            const where = {
                username: verifyToken.username
            }
            const results = await select('users', where)
            if(results[0].admin === 1) {
                next()
            } else {
                res.redirect('./calendar.html')
            }
        } else {
            res.redirect('/login.html')
        }
    } catch (err) {
        log('error-log', err.toString())
        res.redirect('/login.html')
    }
}

module.exports = verifyAdmin
