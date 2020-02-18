const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {

    const token = req.cookies.token
    if(typeof req.cookies !== 'undefined'){
        // Verify token with jwt
        jwt.verify(token, 'secret-key', (err, authData) => {
            if(err) {
                //res.status(500).json({ msg: err }) 
                console.log(err) 
                res.redirect('login.html')
            }
            next()
        })
    } else {
        res.redirect('login.html')
    }
}

module.exports = verifyToken