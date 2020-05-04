const jwt = require('jsonwebtoken')
const express = require('express')
const log = require('../../utils/log')
const router = express.Router()

router.get('/', (req, res) => {
    const token = req.cookies.token
    if(token){
        jwt.verify(token, 'secret-key', (err, authData) => {
            if(err) {
                log('error-log', err.toString() + '\n')
                res.json({ token: false })
            } else {
                res.json({ token: true })
            }
        })
    } else {
        res.json({ token: false })
    }
})

module.exports = router