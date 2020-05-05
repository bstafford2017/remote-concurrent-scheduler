function alert(selector, text, success){
    if(success) {
        $(selector).removeClass('alert-danger')
        $(selector).addClass('alert-success')
    } else {
        $(selector).removeClass('alert-success')
        $(selector).addClass('alert-danger')
    }
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
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

// Global variables
let updateRoom = {}
let deleteRoom = ''

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
    },
    error: function(response) {
        alert('#alert', response.responseJSON.msg, false)   
    }
})


// Get rooms for building change
$(document).on('click', '#search-button', event => {
    event.preventDefault()
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
                            switch(i){
                                case 0:
                                    weekdaysString += 'Sun '
                                    break
                                case 1:
                                    weekdaysString += 'Mon '
                                    break
                                case 2:
                                    weekdaysString += 'Tues '
                                    break
                                case 3:
                                    weekdaysString += ' Wed'
                                    break
                                case 4:
                                    weekdaysString += ' Thur'
                                    break
                                case 5:
                                    weekdaysString += ' Fri'
                                    break
                                case 6:
                                    weekdaysString += ' Sat'
                                    break
                            }
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
        },
        error: function(response) {
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})

// Update a user
// NOTE: Need event delegation since button is placed onload
$(document).on('click', '.update-room', (event) => {
    event.preventDefault()
    updateRoom.id = $(event.target).parents('tr').attr('id')
    updateRoom.number = $(event.target).parents('tr').find('.number').val()
    updateRoom.seats = $(event.target).parents('tr').find('.seats').val()
    updateRoom.projector = $(event.target).parents('tr').find('.projector').val()

    $('.modal .btn-secondary').attr('id', 'update')
    $('.modal-title').empty()
    $('.modal-title').append(`Update '${updateRoom.number}'?`)
    $('.modal-text').empty()
    $('.modal-text').append(`Are you sure you want to update username '<b>${updateRoom.number}</b>'?`)
    $("#myModal").modal('show')
})

// Delete a user
// NOTE: Need event delegation since button is placed onload
$(document).on('click', '.delete-room', (event) => {
    event.preventDefault()
    deleteRoom = $(event.target).parents('tr').attr('id')
    const number = $(event.target).parents('tr').find('.number').val()
    $('.modal .btn-secondary').attr('id', 'delete')
    $('.modal-title').empty()
    $('.modal-title').append(`Delete '${number}'?`)
    $('.modal-text').empty()
    $('.modal-text').append(`Are you sure you want to delete username '<b>${number}</b>'?`)
    $("#myModal").modal('show')
})

$(document).on('click', '.modal .btn-secondary', event => {
    $("#myModal").modal('hide')
    const operation = $(event.target).attr('id')
    if(operation === 'delete'){
        const id = deleteRoom
        $.ajax({
            type: 'post',
            url: '/api/room/delete',
            data: {
                id
            },
            success: function(response) {
                $('#selected-building').trigger('change')
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    } else {
        const id = updateRoom.id
        const number = updateRoom.number
        const seats = updateRoom.seats
        const projector = updateRoom.projector
        const building = $('#selected-building').val()
        $.ajax({
            type: 'post',
            url: '/api/room/update',
            data: {
                id,
                number,
                seats,
                projector,
                building
            },
            success: function(response) {
                $('#selected-building').trigger('change')
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    }
})