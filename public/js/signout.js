$('#signout').click((event) => {
    event.preventDefault()
    document.cookie = 'token=; expires=' + new Date()
    window.location.replace('login.html')
})