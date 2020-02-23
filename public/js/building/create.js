$('#create-building').click((event) => {
    event.preventDefault()
    const name = $('#building-name').val()
    if(!name) {
        $('#alert').empty()
        $('#alert').append("Invalid name")
    }
    $.ajax({
        type: 'post',
        url: '/api/building',
        data: {
            name
        },
        success: function(response){
            $('#building-list').append(`<div>${response.name}</div>`)

        },
        error: function(){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})