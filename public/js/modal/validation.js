/* On load add building to input */
$($.ajax({
    type: "get",
    url: "api/building",
    success: function(response){
        response.results.forEach(building => {
            $('#building, #filter-building').append(`<option value="${building.id}">${building.name}</option>`)
        })
    },
    error: function(response){
        $('#alert').empty()
        $('#alert').append(response)
    }
}))

/* For filter building selection */
$(document).on('change', '#filter-building', event => {
    const building = $('#filter-building').val()

    $.ajax({
        type: "get",
        url: "api/room/" + building,
        success: function(response){
            const element = $('#filter-room')
            element.empty()
            element.append('<option selected disabled hidden>All Rooms</option>')
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


/* Both create and view tab building change */
$(document).on('change', '.building', event => {
    const building = $(event.target).children('option:selected').val()

    $.ajax({
        type: "get",
        url: "api/room/" + building,
        success: function(response){
            const element = $(event.target).parents('.parent').find('.room')
            element.empty()
            element.append('<option selected disabled hidden>All Rooms</option>')
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

/* Both create and view tab changing the start-time */
$(document).on('change', '.start-time', event => {
    $('.end-time').prop('selectedIndex', 0)
    const start = $(event.target).val()
    let hitStart = false
    $(event.target).parents('.parent').find('.end-time > option').each(function() {
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

// For create recur validation
$('#recur').change(() => {
    if($('#recur').is(':checked')){
        $('#recur-end').removeAttr('disabled')
        $('#sunday').removeAttr('disabled')
        $('#monday').removeAttr('disabled')
        $('#tuesday').removeAttr('disabled')
        $('#wednesday').removeAttr('disabled')
        $('#thursday').removeAttr('disabled')
        $('#friday').removeAttr('disabled')
        $('#saturday').removeAttr('disabled')
    } else {
        $('#recur-end').attr('disabled', 'disabled')
        $('#sunday').attr('disabled', 'disabled')
        $('#monday').attr('disabled', 'disabled')
        $('#tuesday').attr('disabled', 'disabled')
        $('#wednesday').attr('disabled', 'disabled')
        $('#thursday').attr('disabled', 'disabled')
        $('#friday').attr('disabled', 'disabled')
        $('#saturday').attr('disabled', 'disabled')
    }

})