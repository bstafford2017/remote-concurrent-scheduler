const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const token = req.cookies.token
    if(!token){
        jwt.verify(token, 'secret-key', (err, authData) => {
            if(err) {
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