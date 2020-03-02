function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

// Get all buildings
$.ajax({
    type: 'get',
    url: '/api/building',
    success: function(response) {
        response.results.forEach(building => {
            $('#building').append(
                `<option value="${building.name.replace(' ', '_')}">${building.name}</option>`)
            $('#selected-building').append(
                `<option value="${building.name.replace(' ', '_')}">${building.name}</option>`)
        })
    },
    error: function(response) {
        $('#alert').empty()
        $('#alert').append(response.responseJSON.msg)
    }
})

$('#selected-building').change(event => {
    const building = $('#selected-building').val().replace('_', ' ')

    $.ajax({
        type: 'get',
        url: '/api/room/' + building,
        success: function(response) {
            $('#room-list').empty()
            response.results.forEach(room => {
                $('#room-list').append(
                    `<tr id="${room.id}"></td>
                        <td><input type="text" class="name form-control" value="${room.name}"></td>
                        <td><input type="text" class="seats form-control" value="${room.seats}"></td>
                        <td><select class="projector user-cell">
                            <option value="0" ${(room.projector === 0) ? 'selected' : ''}>False</option>
                            <option value="1" ${(room.projector === 1) ? 'selected' : ''}>True</option>
                        </select></td>
                        <td><button class="update-room btn btn-secondary">Update</button></td>
                        <td><button class="delete-room btn btn-secondary">Delete</button></td>
                    </tr>`)
            })
        },
        error: function(response) {
            $('#alert').empty()
            $('#alert').append(response.responseJSON.msg)
        }
    })
})

$('#create-room').click((event) => {
    event.preventDefault()
    const name = $('#name').val()
    const seats = $('#seats').val()
    const projector = $('#projector').val()
    const building = $('#building').val()

    $.ajax({
        type: 'post',
        url: '/api/room/create',
        data: {
            id: null,
            name,
            seats,
            projector,
            building
        },
        success: function(response) {
            $('#room-list').empty()
            response.results.forEach(room => {
                $('#room-list').append(
                    `<tr id="${room.id}"></td>
                        <td><input type="text" class="name form-control" value="${room.name}"></td>
                        <td><input type="text" class="seats form-control" value="${room.seats}"></td>
                        <td><select class="projector user-cell">
                            <option value="0" ${(room.projector === 0) ? 'selected' : ''}>False</option>
                            <option value="1" ${(room.projector === 1) ? 'selected' : ''}>True</option>
                        </select></td>
                        <td><button class="update-room btn btn-secondary">Update</button></td>
                        <td><button class="delete-room btn btn-secondary">Delete</button></td>
                    </tr>`)
            })
        },
        error: function(response) {
            $('#alert').empty()
            $('#alert').append(response.responseJSON.msg)
        }
    })
})