function filter(str){
    return str.toString().replace(/[`~!@#$%^&*()|+=?;'",.<>\{\}\[\]\\]/gi, '')
}

module.exports = filter