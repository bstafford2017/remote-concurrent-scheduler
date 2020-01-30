$('#submit').onclick(function(){
    $.ajax({
        type: "get",
        url: "update.php",
        data: {
            data: $('#data').val(),
        },
        success: function(){
            $('#alert').empty()
            $('#alert').append("")
        },
        error: function(){
            $('#alert').empty()
            $('#alert').append("")
        }
    })
})