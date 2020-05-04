function filter(str){
    str = str.toString()
    return str.replace(/[`~!@#$%^&*()|+=?;'",.<>\{\}\[\]\\]/gi, '')
}

module.exports = filter