function alert(selector, text, success){
    $(selector).removeClass(success ? 'alert-danger' : 'alert-success')
    $(selector).addClass(success ? 'alert-success' : 'alert-danger')
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

function modal(id, title, body, update) {
    $(id).find('.modal .btn-secondary').attr('id', 
        (update) ? 'update' : 'delete')
    $(id).find('.modal-title').empty()
    $(id).find('.modal-title').append(title)
    $(id).find('.modal-text').empty()
    $(id).find('.modal-text').append(body)
    $(id).modal('show')
}

$(document).on('click', '.update', event => {
    event.preventDefault()
    const title = $(event.target).parents('.card').find('.title').val()

    modal('#innerModal', `Update '${title}'?`,
        `Are you sure you want to update the event '${title}'`, false)
})

$(document).on('click', '.delete', event => {
    event.preventDefault()
    const title = $(event.target).parents('.card').find('.title').val()

    modal('#innerModal', `Update '${title}'?`,
        `Are you sure you want to update the event '${title}'`, false)
})

$(document).on('click', '.modal .btn-secondary', event => {
    $("#innerModal").modal('hide')
    $('#myModal').modal('hide')
    const operation = $(event.target).attr('id')
    if(operation === 'delete'){
        const id = $(event.target).parents('.event').attr('id')
        $.ajax({
            type: "post",
            url: "api/event/delete",
            data: {
                id
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
        const parent = $(event.target).parents('.event')
        const id = parent.attr('id')
        const title = parent.find('.title').val()
        const date = parent.find('.date').val()
        const building = parent.find('.building').val()
        const room = parent.find('.room').val()
        const start = parent.find('.start-time option:selected').val()
        const end = parent.find('.end-time option:selected').val()
        const endRecur = parent.find('.recur-end').val()
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
        $.ajax({
            type: "post",
            url: "api/event/update",
            data: {
                id,
                title,
                date,
                building,
                room,
                start,
                end,
                weekString,
                endRecur,
                recurId
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
