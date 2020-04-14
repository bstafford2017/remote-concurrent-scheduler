$(document).on('click', '.update', event => {
    event.preventDefault()
    const parent = $(event.target).parents('.event')
    const id = parent.attr('id')
    const title = parent.find('.title').val()
    const date = parent.find('.date').val()
    const building = parent.find('.building').val()
    const room = parent.find('.room').val()
    const start = parent.find('.start-time option:selected').val()
    const end = parent.find('.end-time option:selected').val()

    $.ajax({
        type: "post",
        url: "api/event/" + id,
        data: {
            title,
            date,
            building,
            room,
            start,
            end
        },
        success: function(response){
            $('#myModal').modal('hide')
        },
        error: function(response){
            alert(response.responseJSON.msg)
        }
    })
})

$(document).on('click', '.delete', event => {
    event.preventDefault()
    const id = $(event.target).parents('.event').attr('id')
    $.ajax({
        type: "delete",
        url: "api/event/" + id,
        success: function(response){
            $(event.target).parents('.event').remove()
        },
        error: function(response){
            alert(response.responseJSON.msg)
        }
    })
})