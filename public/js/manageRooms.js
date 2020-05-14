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

// Global variable
let createRoom = {}
let updateRoom = {}
let deleteRoom = ''

// Admin navbar
$.ajax({
    type: "get",
    url: "api/user/admin",
    success: function(response){
        if(response.admin === 'true'){
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageBuildings.html">Manage Buildings</a></li>')
            $('#left-nav').append('<li class="nav-item active"><a class="nav-link" href="manageRooms.html">Manage Rooms</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageUsers.html">Manage Users</a></li>')
        }
    },
    error: function(response) {
        alert('#alert', response.responseJSON.msg, false)   
    }
})


// Get all buildings
$.ajax({
    type: 'get',
    url: '/api/building',
    success: function(response) {
        response.results.forEach(building => {
            $('#building').append(
                `<option value="${building.id}">${building.name}</option>`)
            $('#selected-building').append(
                `<option value="${building.id}">${building.name}</option>`)
        })
        $('#spinner').hide()
    },
    error: function(response) {
        $('#spinner').hide()
        alert('#alert', response.responseJSON.msg, false)
    }
})

// Get rooms for building change
$(document).on('change', '#selected-building', event => {
    const building = $('#selected-building').val()
    $.ajax({
        type: 'get',
        url: '/api/room/' + building,
        success: function(response) {
            $('#room-list').empty()
            response.results.forEach(room => {
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
                $('#no-results').show()
            } else {
                $('#no-results').hide()
            }
        },
        error: function(response) {
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})

// Create a room
$(document).on('click', '#create-room', event => {
    event.preventDefault()
    createRoom.number = $('#number').val()
    createRoom.seats = $('#seats').val()
    createRoom.projector = $('#projector').val()
    createRoom.building = $('#building').val()

    // Check for special characters
    if(Object.values(createRoom).some(field => isInvalid(field))) {
        modal('#innerModal', 'Fields contain special characters',
            'These special characters will be remove. Are you sure you want to continue?')
        return
    }

    modal('#myModal', `Create ${createRoom.number}?`,
    `Are you sure you want to create the room <b>${createRoom.number}</b>?`)
})

// Update a user
$(document).on('click', '.update-room', (event) => {
    event.preventDefault()
    updateRoom.id = $(event.target).parents('tr').attr('id')
    updateRoom.number = $(event.target).parents('tr').find('.number').val()
    updateRoom.seats = $(event.target).parents('tr').find('.seats').val()
    updateRoom.projector = $(event.target).parents('tr').find('.projector').val()

    // Check for special characters
    if(Object.values(updateRoom).some(field => isInvalid(field))) {
        modal('#myModal', 'Fields contain special characters',
            'These special characters will be remove. Are you sure you want to continue?')
        return
    }

    modal('#myModal', `Update '${updateRoom.number}'?`, 
    `Are you sure you want to update the room '<b>${updateRoom.number}</b>'?`,
        true)
})

// Delete a user
$(document).on('click', '.delete-room', (event) => {
    event.preventDefault()
    deleteRoom = $(event.target).parents('tr').attr('id')
    const number = $(event.target).parents('tr').find('.number').val()

    modal('#myModal', `Delete '${number}'?`, 
    `Are you sure you want to delete the room '<b>${number}</b>'?`,
        false)
})

$(document).on('click', '.modal .btn-secondary', event => {
    $("#myModal").modal('hide')
    const operation = $(event.target).attr('id')
    if(operation === 'delete'){
        $.ajax({
            type: 'post',
            url: '/api/room/delete',
            data: {
                id: deleteRoom
            },
            success: function(response) {
                alert('#alert', `Deleted room`, true)
                $('#selected-building').trigger('change')
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    } else if(operation === 'update') {
        $.ajax({
            type: 'post',
            url: '/api/room/update',
            data: {
                id: updateRoom.id,
                number: updateRoom.number,
                seats: updateRoom.seats,
                projector: updateRoom.projector,
                building: $('selected-building').val()
            },
            success: function(response) {
                alert('#alert', `Updated room '${response.results[0].number}'`, true)
                $('#selected-building').trigger('change')
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    } else {
        $.ajax({
            type: 'post',
            url: '/api/room/create',
            data: {
                id: null,
                number: createRoom.number,
                seats: createRoom.seats,
                projector: createRoom.projector,
                building: createRoom.building
            },
            success: function(response) {
                const building = $('#selected-building option:selected').text()
                alert('#alert', `Created room '${response.results.number}'`, true)
                if(building === response.results.name){
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
                $("#building option:eq(0)").prop("selected", true)
                $('#number').val('')
                $('#seats').val('')
                $('#projector').val('')
                $("#projector option:eq(0)").prop("selected", true)
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })

    }
})