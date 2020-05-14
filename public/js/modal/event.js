function alert(selector, text, success){
    $(selector).removeClass(success ? 'alert-danger' : 'alert-success')
    $(selector).addClass(success ? 'alert-success' : 'alert-danger')
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

function modal(id, title, body, update) {
    if(typeof update === 'undefined') {
        $(id).find('.btn-secondary').attr('id', 'create')
    } else if(update) {
        $(id).find('.btn-secondary').attr('id', 'update')
    } else {
        $(id).find('.btn-secondary').attr('id', 'delete')
    }
    $(id).find('.modal-title').empty()
    $(id).find('.modal-title').append(title)
    $(id).find('.modal-text').empty()
    $(id).find('.modal-text').append(body)
    $(id).modal('show')
}

function isInvalid(str){
    return /[`~!@#$%^&*()|+=?;'",.<>\{\}\[\]\\]/g.test(str);
}

// Global variable
let createEvent = {}
let updateEvent = {}
let deleteEvent = ''

$('#create-event').click(event => {
    event.preventDefault()
    createEvent.title = $('#title').val()
    createEvent.building = $('#building').val()
    createEvent.room = $('#room').val()
    createEvent.date = $('#date').val()
    createEvent.start = $('#start-time option:selected').val()
    createEvent.end = $('#end-time option:selected').val()
    createEvent.endRecur = $('#recur-end').val()
    let weekString = ''

    // Check if title is > 15 characters
    if(String(createEvent.title).length > 15) {
        $('#myModal').modal('hide')
        alert('#alert', 'Please enter an event title less than 15 characters', false)
        return
    }

    // Check for special characters
    if(Object.values(createEvent).some(field => isInvalid(field))) {
        modal('#innerModal', 'Fields contain special characters',
            'These special characters will be remove. Are you sure you want to continue?')
        return
    }

    if($('#recur').is(':checked')) {
        $('.form-row').find('.form-check-input').each(function() {
            if($(this).attr('id') !== 'recur') {
                if($(this).is(':checked')) {
                    weekString += '1'
                } else {
                    weekString += '0'
                }
            }
        })
        if(weekString === '0000000') {
            $('#myModal').modal('hide')
            alert('#alert', 'Select at least one weekday', false)
        }
        if(!endRecur) {
            $('#myModal').modal('hide')
            alert('#alert', 'Select a date to end recurring event', false)
        }
    }
    createEvent.weekString = weekString

    modal('#innerModal', `Create '${createEvent.title}'?`,
        `Are you sure you want to create the event '${createEvent.title}'`)
})

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

    // Check if title is > 15 characters
    if(String(updateEvent.title).length > 15) {
        $('#myModal').modal('hide')
        alert('#alert', 'Please enter an event title less than 15 characters', false)
        return
    }

    // Check for special characters
    if(Object.values(updateEvent).some(field => isInvalid(field))) {
        modal('#innerModal', 'Fields contain special characters',
            'These special characters will be remove. Are you sure you want to continue?')
        return
    }

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
        if(!updateEvent.endRecur) {
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
    } else if(operation === 'update') {
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
    } else {
        $.ajax({
            type: "post",
            url: "api/event/create",
            data: {
                title : createEvent.title,
                building: createEvent.building,
                room: createEvent.room,
                date: createEvent.date,
                start: createEvent.start,
                end: createEvent.end,
                weekString: createEvent.weekString,
                endRecur: createEvent.endRecur
            },
            success: function(response) {
                location.reload()
            },
            error: function(response) {
                $('#myModal').modal('hide')
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    }
})