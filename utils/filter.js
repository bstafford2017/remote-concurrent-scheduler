function filter(str){
    str = str.toString()
    return str.replace(/[`~!@#$%^&*()_|+=?;'",.<>\{\}\[\]\\]/gi, '')
}

module.exports = filter