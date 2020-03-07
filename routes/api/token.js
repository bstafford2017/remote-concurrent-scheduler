const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const token = req.cookies.token
    if(token){
        jwt.verify(token, 'secret-key', (err, authData) => {
            if(err) {
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