function alert(selector, text, success){
    $(selector).removeClass(success ? 'alert-danger' : 'alert-success')
    $(selector).addClass(success ? 'alert-success' : 'alert-danger')
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

function modal(id, title, body, update) {
    $(id).find('.btn-secondary').attr('id', 
        (update) ? 'update' : 'delete')
    $(id).find('.modal-title').empty()
    $(id).find('.modal-title').append(title)
    $(id).find('.modal-text').empty()
    $(id).find('.modal-text').append(body)
    $(id).modal('show')
}

// Global variable
let updateEvent = {}
let deleteEvent = ''

$(document).on('click', '.update', event => {
    event.preventDefault()
    const parent = $(event.target).parents('.event')
    updateEvent.id = parent.attr('id')
    updateEvent.title = parent.find('.title').val()
    updateEvent.date = parent.find('.date').val()
    updateEvent.building = parent.find('.building').val()
    updateEvent.room = parent.find('.room').val()
    updateEvent.start = parent.find('.start-time option:selected').val()
    updateEvent.end = parent.find('.end-time option:selected').val()
    updateEvent.endRecur = parent.find('.recur-end').val()
    let weekString = ''
    let atLeastOne = false
    let recurId = ''
    if(parent.find('.recur-block').css('display') === 'block'){
        recurId = parent.find('.recur-block').attr('id')
        $(parent.find('.form-check-input')).each(function() {
            if($(this).attr('id') !== 'recur') {
                if($(this).is(':checked')) {
                    atLeastOne = true
                    weekString += '1'
                } else {
                    weekString += '0'
                }
            }
        })
        if(!atLeastOne) {
            alert('Select at least one weekday')
        }
        if(!endRecur) {
            alert('Select a date to end recurring event')
        }
    }
    updateEvent.weekString = weekString
    updateEvent.recurId = recurId

    modal('#innerModal', `Update '${updateEvent.title}'?`,
        `Are you sure you want to update the event '${updateEvent.title}'`, true)
})

$(document).on('click', '.delete', event => {
    event.preventDefault()
    const title = $(event.target).parents('.event').find('.title').val()
    deleteEvent =  $(event.target).parents('.event').attr('id')

    modal('#innerModal', `Update '${title}'?`,
        `Are you sure you want to update the event '${title}'`, false)
})

$(document).on('click', '.modal .btn-secondary', event => {
    $("#innerModal").modal('hide')
    $('#myModal').modal('hide')
    const operation = $(event.target).attr('id')
    if(operation === 'delete'){
        $.ajax({
            type: "post",
            url: "api/event/delete",
            data: {
                id: deleteEvent
            },
            success: function(response){
                $(event.target).parents('.event').remove()
                location.reload()
            },
            error: function(response){
                $('#innerModal').modal('hide')
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    } else {
        $.ajax({
            type: "post",
            url: "api/event/update",
            data: {
                id: updateEvent.id,
                title: updateEvent.title,
                date: updateEvent.date,
                building: updateEvent.building,
                room: updateEvent.room,
                start: updateEvent.start,
                end: updateEvent.end,
                weekString: updateEvent.weekString,
                endRecur: updateEvent.endRecur,
                recurId: updateEvent.recurId
            },
            success: function(response){
                $('#innerModal').modal('hide')
                location.reload()
            },
            error: function(response){
                $('#innerModal').modal('hide')
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    }
})
