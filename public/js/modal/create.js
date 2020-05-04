function alert(selector, text, success){
    if(success) {
        $(selector).addClass('alert-success')
    } else {
        $(selector).addClass('alert-danger')
    }
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
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
            alert('Select at least one weekday')
        }
        if(!endRecur) {
            alert('Select a date to end recurring event')
        }
    }
    $.ajax({
        type: "post",
        url: "api/event",
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