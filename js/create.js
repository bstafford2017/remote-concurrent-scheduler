$('#submit').onclick(function(){
    $.ajax({
        type: "post",
        url: "create.php",
        data: {
            data: $('#data').val(),
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