function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

function filter(str){
    return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '').replace(/\s/g, '')
}

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
    if(filter(name) === '') {
        alert('#create-alert', 'Invalid building name')
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
            alert('#create-alert', response)
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
    if(namesToUpdate.length === 0) {
        alert('#manage-alert', 'Please select a name(s) to delete')
    } else if(namesToUpdate.some(x => filter(x.newName) === '')) {
        alert('#manage-alert', 'Please enter valid names')
    } else {
        $.ajax({
            type: 'post',
            url: '/api/building/update',
            data: {
                names: namesToUpdate
            },
            success: function(response) {
                $('#manage-card').find('input:checkbox:checked').each(function() {
                    $(this).prop('checked', false)
                })
            },
            error: function(response) {
                alert('#manage-alert', response)
            }
        })
    }
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
        alert('#manage-alert', 'Please select a name(s) to delete')
    } else {
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
                alert('#manage-alert', response)
            }
        })
    }
})