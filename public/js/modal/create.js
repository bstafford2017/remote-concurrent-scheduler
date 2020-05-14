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
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

$('#create-event').click(event => {
    event.preventDefault()
    const title = $('#title').val()
    const building = $('#building').val()
    const room = $('#room').val()
    const date = $('#date').val()
    const start = $('#start-time option:selected').val()
    const end = $('#end-time option:selected').val()
    const endRecur = $('#recur-end').val()
    let weekString = ''

    // Check if title is > 15 characters
    if(String(title).length > 15) {
        $('#myModal').modal('hide')
        alert('#alert', 'Please enter an event title less than 15 characters', false)
        return
    }

    // Check for special characters
    if(isInvalid(title) || isInvalid(building) || isInvalid(room) ||
        isInvalid(date) || isInvalid(start) || isInvalid(end)) {
        modal('#innerModal', 'Fields contain special characters',
            'These special characters will be remove. Are you sure you want to continue?')
        return
    }

    if($('#recur').is(':checked')) {
        let atLeastOne = false
        $('.form-row').find('.form-check-input').each(function() {
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
            $('#myModal').modal('hide')
            alert('#alert', 'Select at least one weekday', false)
        }
        if(!endRecur) {
            $('#myModal').modal('hide')
            alert('#alert', 'Select a date to end recurring event', false)
        }
    }
    $.ajax({
        type: "post",
        url: "api/event/create",
        data: {
            title,
            building,
            room,
            date,
            start,
            end,
            weekString,
            endRecur
        },
        success: function(response) {
            let day = parseInt(response.results.date.substring(8,10))
            if($('#by-week').is(":checked")){
                const start = response.results.startTime.split(':')[0]
                const end = response.results.endTime.split(':')[0]
                const diff = end - start
                $("#" + day).append("<div class=\"week-event\" style=\"margin-top:" + (start - 6) *
                    $('.scale div').outerHeight() + "px; height: " + diff * 
                    $('.scale div').outerHeight() + "px;\">" + response.results.title + "</div>")
            } else {
                $("#" + day).append(`<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Tooltip on top\"
                    class=\"month-event\">${response.results.title}</div>`)
            }
            $('#myModal').modal('hide')
            location.reload()
        },
        error: function(response) {
            $('#myModal').modal('hide')
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})