function alert(selector, text, success){
    $(selector).removeClass(success ? 'alert-danger' : 'alert-success')
    $(selector).addClass(success ? 'alert-success' : 'alert-danger')
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

function modal(id, title, body, update) {
    $(id).find('.btn-secondary').attr('id', 
        (update) ? 'update' : 'delete')
    $(id).find('.modal-title').empty()
    $(id).find('.modal-title').append(title)
    $(id).find('.modal-text').empty()
    $(id).find('.modal-text').append(body)
    $(id).modal('show')
}

// Global variable
let updateBuilding = []
let deleteBuilding = []

// Admin navbar
$.ajax({
    type: "get",
    url: "api/user/admin",
    success: function(response){
        if(response.admin === 'true'){
            $('#left-nav').append('<li class="nav-item active"><a class="nav-link" href="manageBuildings.html">Manage Buildings</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageRooms.html">Manage Rooms</a></li>')
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
        $('#spinner').hide()
    },
    error: function(response) {
        $('#spinner').hide()
        alert('#alert', response.responseJSON.msg, false)
    }
})

// Create a building
$(document).on('click', '#create-building', event => {
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
            alert('#alert', `Created building '${response.results.name}'`, true)
            $('#building-name').val('')
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})

// Update a building
$(document).on('click', '#update-building', event => {
    event.preventDefault()
    let buildingNames = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        buildingNames.push($(this).parent().find('.text').val())
    })
    let formattedNames = ''
    buildingNames.forEach((name, index, arr) => {
        formattedNames += (index === arr.length - 1) ? `'${name}'` : `'${name}', `
    })

    modal('#myModal', `Update ${formattedNames}?`,
        `Are you sure you want to update the building <b>${formattedNames}</b>?`,
        true)
})

// Delete a building
$(document).on('click', '#delete-building', event => {
    event.preventDefault()
    let buildingNames = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        buildingNames.push($(this).parent().find('.text').val())
    })
    let formattedNames = ''
    buildingNames.forEach((name, index, arr) => {
        formattedNames += (index === arr.length - 1) ? `'${name}'` : `'${name}', `
    })

    modal('#myModal', `Delete ${formattedNames}?`,
        `Are you sure you want to delete the building <b>${formattedNames}</b>?`,
        false)
})

$(document).on('click', '.modal .btn-secondary', event => {
    $("#myModal").modal('hide')
    const operation = $(event.target).attr('id')
    if(operation === 'delete'){
        const ids = []
        $('#manage-card').find('input:checkbox:checked').each(function() {
            ids.push($(this).parent().attr('id'))
        })
        $.ajax({
            type: 'post',
            url: '/api/building/delete',
            data: {
                ids
            },
            success: function(response){
                alert('#alert', 'Deleted building(s)', true)
                response.results.forEach((id) => {
                    $('#' + id).remove()
                })
            },
            error: function(response){
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    } else {
        const names = []
        $('#manage-card').find('input:checkbox:checked').each(function() {
            const updatedName = {
                id: $(this).parent().attr('id'),
                name: $(this).parent().children('.text').val()
            }
            names.push(updatedName)
        })
        $.ajax({
            type: 'post',
            url: '/api/building/update',
            data: {
                names
            },
            success: function(response) {
                $('#manage-card').find('input:checkbox:checked').each(function() {
                    alert('#alert', 'Updated building(s)', true)
                    $(this).prop('checked', false)
                })
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    }
})
