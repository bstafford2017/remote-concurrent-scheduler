function alert(selector, text, success){
    $(selector).removeclass(success ? 'alert-danger' : 'alert-success')
    $(selector).addclass(success ? 'alert-success' : 'alert-danger')
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

function formatDate(date) {
    const unformatted = date.split('T')[0].split('-')
    return unformatted[1] + '-' + unformatted[2] + '-' + unformatted[0]
}

function timeConversion(time) {
    const splitTime = time.split(':')
    const hours = splitTime[0] % 12 || 12
    const minutes = splitTime[1]
    const AmOrPm = hours >= 12 ? 'pm' : 'am'
    return hours + ':' + minutes + AmOrPm
}

function getWeekDay(index) {
    switch(index) {
        case 0:
            return 'Sun '
        case 1:
            return 'Mon '
        case 2:
            return 'Tues '
        case 3:
            return 'Wed '
        case 4:
            return 'Thur '
        case 5:
            return 'Fri '
        case 6:
            return 'Sat '
        default:
            return ''
    }
}

// Admin navbar
$.ajax({
    type: "get",
    url: "api/user/admin",
    success: function(response){
        if(response.admin === 'true'){
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageBuildings.html">Manage Buildings</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageRooms.html">Manage Rooms</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageUsers.html">Manage Users</a></li>')
        }
        $('#spinner').hide()
    },
    error: function(response) {
        $('#spinner').hide()
        alert('#alert', response.responseJSON.msg, false)   
    }
})

$(document).on('click', '#search-button', event => {
    event.preventDefault()
    $('#spinner').show()
    $('#results').show()
    const search = $('#search').val()

    $.ajax({
        type: 'get',
        url: '/api/event/' + search,
        success: function(response) {
            $('#results-list').empty()
            response.results.forEach(event => {
                let weekdaysString = ''
                if(event.weekdays) {
                    for(let i = 0; i < 7; i++) {
                        if(event.weekdays.charAt(i) === '1'){
                            weekdaysString += getWeekDay(i)
                        }
                    }
                } else {
                    weekdaysString = '-'
                }
                $('#results-list').append(
                    `<tr id="${event.id}"></td>
                        <td>${event.title}</td>
                        <td>${formatDate(event.date)}</td>
                        <td>${timeConversion(event.startTime)}</td>
                        <td>${timeConversion(event.endTime)}</td>
                        <td>${event.name}</td>
                        <td>${event.number}</td>
                        <td>${weekdaysString}</td>
                        <td>${(event.end) ? formatDate(event.end) : '-'}</td>
                        <td>${event.username}</td>
                    </tr>`)
            })
            if(response.results.length === 0){
                $('#results-list').empty()
                $('.response-text').show()
            } else {
                $('.response-text').hide()
            }
            $('#spinner').hide()
        },
        error: function(response) {
            $('#spinner').hide()
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})