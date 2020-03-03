function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

// Global variables
let updateRoom = {}
let deleteRoom = ''

// Get all buildings
$.ajax({
    type: 'get',
    url: '/api/building',
    success: function(response) {
        response.results.forEach(building => {
            $('#building').append(
                `<option>${building.name}</option>`)
            $('#selected-building').append(
                `<option>${building.name}</option>`)
        })
    },
    error: function(response) {
        $('#alert').empty()
        $('#alert').append(response.responseJSON.msg.sqlMessage)
    }
})

// Get rooms for building change
$('#selected-building').change(event => {
    const building = $('#selected-building').val()

    $.ajax({
        type: 'get',
        url: '/api/room/' + building,
        success: function(response) {
            $('#room-list').empty()
            response.results.forEach(room => {
                console.log(room)
                $('#room-list').append(
                    `<tr id="${room.id}"></td>
                        <td><input type="text" class="number form-control" value="${room.number}"></td>
                        <td><input type="text" class="seats form-control" value="${room.seats}"></td>
                        <td><select class="projector form-control">
                            <option value="0" ${(room.projector === 0) ? 'selected' : ''}>False</option>
                            <option value="1" ${(room.projector === 1) ? 'selected' : ''}>True</option>
                        </select></td>
                        <td><button class="update-room btn btn-secondary">Update</button></td>
                        <td><button class="delete-room btn btn-secondary">Delete</button></td>
                    </tr>`)
            })
            if(response.results.length === 0){
                $('#room-list').append(
                    `<tr>
                        <td></td>
                        <td></td>
                        <td class="response-text">No results</td>
                        <td></td>
                        <td></td>
                    </tr>`)
            }
        },
        error: function(response) {
            alert('#create-alert', response.responseJSON.msg.sqlMessage)
        }
    })
})

// Create a room
$('#create-room').click((event) => {
    event.preventDefault()
    const number = $('#number').val()
    const seats = $('#seats').val()
    const projector = $('#projector').val()
    const building = $('#building').val()

    $.ajax({
        type: 'post',
        url: '/api/room/create',
        data: {
            id: null,
            number,
            seats,
            projector,
            building
        },
        success: function(response) {
            const building = $('#selected-building').val()
            if(building === response.results.building){
                $('#room-list').append(
                    `<tr id="${response.results.id}"></td>
                        <td><input type="text" class="number form-control" value="${response.results.number}"></td>
                        <td><input type="text" class="seats form-control" value="${response.results.seats}"></td>
                        <td><select class="projector form-control">
                            <option value="0" ${(response.results.projector === 0) ? 'selected' : ''}>False</option>
                            <option value="1" ${(response.results.projector === 1) ? 'selected' : ''}>True</option>
                        </select></td>
                        <td><button class="update-room btn btn-secondary">Update</button></td>
                        <td><button class="delete-room btn btn-secondary">Delete</button></td>
                    </tr>`)
            }
        },
        error: function(response) {
            alert('#create-alert', response.responseJSON.msg.sqlMessage)
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
                alert('#manage-alert', response.responseJSON.msg.sqlMessage)
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
                alert('#manage-alert', response.responseJSON.msg.sqlMessage)
            }
        })
    }
})