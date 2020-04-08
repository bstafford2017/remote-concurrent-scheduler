$($.ajax({
    type: "get",
    url: "api/building",
    success: function(response){
        response.results.forEach(building => {
            $('#building').append(`<option value="${building.id}">${building.name}</option>`)
        })
    },
    error: function(response){
        $('#alert').empty()
        $('#alert').append(response)
    }
}))

/* For both create and view tab building change */
$(document).on('change', '.building', event => {
    const building = $(event.target).children('option:selected').val()

    $.ajax({
        type: "get",
        url: "api/room/" + building,
        success: function(response){
            const element = $(event.target).parents('.row').find('.room')
            element.empty()
            response.results.forEach(room => {
                element.append(`<option value="${room.id}">${room.number}</option>`)
            })
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})

/* For both create and view tab changing the start-time */
$(document).on('change', '.start-time', event => {
    $('.end-time').prop('selectedIndex', 0)
    const start = $(event.target).val()
    let hitStart = false
    $(event.target).parents('.row').find('.end-time > option').each(function() {
        if(start === $(this).val()){
            hitStart = true
            $(this).hide()
            return;
        }
        
        if(!hitStart)
            $(this).hide()
        else
            $(this).show()
    })
})