$('#submit').onclick(function(){
    $.ajax({
        type: "get",
        url: "delete.php",
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