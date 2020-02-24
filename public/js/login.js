$('#submit').click(function(event){
    event.preventDefault()
    $.ajax({
        type: "post",
        url: "../api/user/login",
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        success: function(response){
            let tokenValue = response.token
            let todaysDate = new Date()
            todaysDate.setDate(todaysDate.getDate() + 1)

            // Set cookie
            document.cookie = 'token=' + tokenValue + '; expires=' + todaysDate.toUTCString()
            window.location.replace('calendar.html')
        },
        error: function(response){
            $('#alert').show()
            $('#username').val('')
            $('#password').val('')
        }
    })
})