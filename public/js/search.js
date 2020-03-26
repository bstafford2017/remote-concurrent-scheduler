function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

function timeConversion(time){
    const splitTime = time.split(':')
    const hours = splitTime[0] % 12 || 12
    const minutes = splitTime[1]
    const AmOrPm = hours >= 12 ? 'pm' : 'am'
    return hours + ':' + minutes + AmOrPm
}

// Global variables
let updateRoom = {}
let deleteRoom = ''

// Get rooms for building change
$('#search-button').click(event => {
    event.preventDefault()
    const search = $('#search').val()

    $.ajax({
        type: 'get',
        url: '/api/event/' + search,
        success: function(response) {
            $('#results-list').empty()
            response.results.forEach(event => {
                $('#results-list').append(
                    `<tr id="${event.id}"></td>
                        <td>${event.title}</td>
                        <td>${event.date.split("T")[0]}</td>
                        <td>${timeConversion(event.startTime)}</td>
                        <td>${timeConversion(event.endTime)}</td>
                        <td>${event.name}</td>
                        <td>${event.number}</td>
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
            alert('#create-alert', response.responseJSON.msg)
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

$('.modal .btn-secondary').click((event) => {
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
                alert('#manage-alert', response.responseJSON.msg)
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
                alert('#manage-alert', response.responseJSON.msg)
            }
        })
    }
})