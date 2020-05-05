$(document).on('click', '#signout', event => {
    event.preventDefault()
    document.cookie = 'token=; expires=' + new Date()
    window.location.replace('login.html')
})