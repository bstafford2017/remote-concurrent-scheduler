function alert(selector, text, success){
    if(success) {
        $(selector).removeClass('alert-danger')
        $(selector).addClass('alert-success')
    } else {
        $(selector).removeClass('alert-success')
        $(selector).addClass('alert-danger')
    }
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

// For redirecting users if they have a valid cookie
$.ajax({
    type: "get",
    url: "/api/token",
    success: function(response){
        if(response.token === true)
            window.location.replace('calendar.html')
    },
    error: function(response){
        alert('#alert', response.responseJSON.msg, false)
    }
})

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
            alert('#alert', response.responseJSON.msg, false)
            $('#username').val('')
            $('#password').val('')
        }
    })
})