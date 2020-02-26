// Get all buildings
$.ajax({
    type: 'get',
    url: 'api/building',
    success: function(response) {
        $('#building-list').append(`<div class="col-2 d-inline" style="padding: 0px">Select</div>
                                    <div class="col-10 d-inline">Edit Building Name</div>`)
        response.forEach(building => {
            $('#building-list').append(
                `<div class="building" id="${building.name.replace(' ', '_')}">
                    <input type="checkbox" class="checkbox col-1">
                    <input type="text" class="text form-control col-10 d-inline" value="${building.name}">
                </div>`)
        })
    },
    error: function(response) {
        $('#alert').empty()
        $('#alert').append(response)
    }
})

// Create a building
$('#create-building').click((event) => {
    event.preventDefault()
    const name = $('#building-name').val()
    if(!name) {
        $('#alert').empty()
        $('#alert').append("Invalid name")
    }
    $.ajax({
        type: 'post',
        url: '/api/building/create',
        data: {
            name
        },
        success: function(response){
            $('#building-list').append(
                `<div class="building" id="${response.name.replace(' ', '_')}">
                    <input type="checkbox" class="checkbox col-1">
                    <input type="text" class="text form-control col-10 d-inline" value="${response.name}">
                </div>`)
            $('#building-name').val('')
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})

// Update a building
$('#update-building').click((event) => {
    event.preventDefault()

    const namesToUpdate = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        const updatedName = {
            oldName: $(this).parent().attr('id').replace('_', ' '),
            newName: $(this).parent().children('.text').val()
        }
        namesToUpdate.push(updatedName)
    })

    const name = $('#building-name').val()
    if(!name) {
        $('#alert').empty()
        $('#alert').append("Invalid name")
    }
    $.ajax({
        type: 'post',
        url: '/api/building/update',
        data: {
            names: namesToUpdate
        },
        success: function(response) {
            response.listOfNames.forEach((name) => {
                $('#' + response.name).html(`<input id="${response.name}-check" type="checkbox" class="checkbox">
                <input id="${response.name}-text" type="text" class="form-control col-sm-10 offset-sm-1 d-inline" value="${response.name}">`)
            })
        },
        error: function(response) {
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})

// Delete a building
$('#delete-building').click((event) => {
    event.preventDefault()

    const namesToDelete = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        let name = $(this).parent().attr('id').replace('_', ' ')
        namesToDelete.push(name)
    })

    if(namesToDelete.length === 0) {
        $('#alert').empty()
        $('#alert').append("Please select a name(s) to delete")
    }
    $.ajax({
        type: 'post',
        url: '/api/building/delete',
        data: {
            names: namesToDelete
        },
        success: function(response){
            response.namesToDelete.forEach((name) => {
                $('#' + name.replace(' ', '_')).remove()
            })
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})