$('#submit').onclick(function(){
    $.ajax({
        type: "get",
        url: "search.php",
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