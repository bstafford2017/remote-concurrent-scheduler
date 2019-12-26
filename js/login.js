$('#submit').onclick(function(){
    $.ajax({
        type: "post",
        url: "login.php",
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        success: function(){
            $('#alert').empty();
            $('#alert').append("");
        },
        error: function(){
            $('#alert').empty();
            $('#alert').append("");
        }
    });
});