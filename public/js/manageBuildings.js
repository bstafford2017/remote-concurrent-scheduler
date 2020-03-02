function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

// Get all buildings
$.ajax({
    type: 'get',
    url: 'api/building',
    success: function(response) {
        $('#building-list').append(`<div class="col-2 d-inline" style="padding: 0px">Select</div>
                                    <div class="col-10 d-inline">Edit Building Name</div>`)
        response.results.forEach(building => {
            $('#building-list').append(
                `<div class="building" id="${building.id}">
                    <input type="checkbox" class="checkbox col-1">
                    <input type="text" class="text form-control col-10 d-inline" value="${building.name}">
                </div>`)
        })
    },
    error: function(response) {
        alert('#alert', response.responseJSON.msg.sqlMessage)
    }
})

// Create a building
$('#create-building').click((event) => {
    event.preventDefault()
    const name = $('#building-name').val()
    $.ajax({
        type: 'post',
        url: '/api/building/create',
        data: {
            name
        },
        success: function(response){
            $('#building-list').append(
                `<div class="building" id="${response.results.id}">
                    <input type="checkbox" class="checkbox col-1">
                    <input type="text" class="text form-control col-10 d-inline" value="${response.results.name}">
                </div>`)
            $('#building-name').val('')
        },
        error: function(response){
            alert('#create-alert', response.responseJSON.msg.sqlMessage)
        }
    })
})

// Update a building
$('#update-building').click((event) => {
    event.preventDefault()

    const names = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        const updatedName = {
            id: $(this).parent().attr('id'),
            name: $(this).parent().children('.text').val()
        }
        names.push(updatedName)
    })
    if(names.length === 0) {
        alert('#manage-alert', 'Please select a name(s) to delete')
    } else {
        $.ajax({
            type: 'post',
            url: '/api/building/update',
            data: {
                names
            },
            success: function(response) {
                $('#manage-card').find('input:checkbox:checked').each(function() {
                    $(this).prop('checked', false)
                })
            },
            error: function(response) {
                alert('#manage-alert', response.responseJSON.msg.sqlMessage)
            }
        })
    }
})

// Delete a building
$('#delete-building').click((event) => {
    event.preventDefault()

    const ids = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        ids.push($(this).parent().attr('id'))
    })

    if(ids.length === 0) {
        alert('#manage-alert', 'Please select a name(s) to delete')
    } else {
        $.ajax({
            type: 'post',
            url: '/api/building/delete',
            data: {
                ids
            },
            success: function(response){
                response.results.forEach((id) => {
                    $('#' + id).remove()
                })
            },
            error: function(response){
                alert('#manage-alert', response.responseJSON.msg.sqlMessage)
            }
        })
    }
})