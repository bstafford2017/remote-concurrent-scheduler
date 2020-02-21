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
            let token = response.token
            let date = new Date()
            date.setDate(date.getDate() + 1)

            // Set cookie
            document.cookie = 'token=' + token + '; expires=' + date.toUTCString()
            window.location.replace('calendar.html')
        },
        error: function(response){
            $('#alert').show()
        }
    })
})