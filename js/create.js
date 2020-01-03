$('#submit').onclick(function(){
    $.ajax({
        type: "get",
        url: "create.php",
        data: {
            name: $('#name').val(),
            title: $('#title').val(),
            room: $('#room').val(),
            building: $('#building').val(),
            user: $('#user').val(),
            projector: $('#projector').val(),
            seats: $('#seats').val()
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