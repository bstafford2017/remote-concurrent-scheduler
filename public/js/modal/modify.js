$(document).on('click', '.update', event => {
    const parent = $(event.target).parents('.event')

    $.ajax({
        type: "get",
        url: "api/event/" + building,
        success: function(response){
            
        },
        error: function(response){
            
        }
    })
})

$(document).on('click', '.delete', event => {
    const id = $(event.target).parents('.event').attr('id')
    $.ajax({
        type: "delete",
        url: "api/event/" + id,
        success: function(response){
            $(event.target).parents('.event').remove()
        },
        error: function(response){
            
        }
    })
})