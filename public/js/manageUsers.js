function alert(selector, text, success){
    if(success) {
        $(selector).addClass('alert-success')
    } else {
        $(selector).addClass('alert-danger')
    }
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

// Global variable
let updateUser = {}
let deleteUser = ''

// Get all users
$.ajax({
    type: 'get',
    url: 'api/user',
    success: function(response) {
        response.results.forEach(user => {
            $('#user-list').append(
                `<tr class="user" id="${user.id}"></td>
                    <td><input type="text" class="username form-control" value="${user.username}"></td>
                    <td><input type="password" class="password form-control" value="${user.password}"></td>
                    <td><input type="text" class="fname form-control" value="${user.fname}"></td>
                    <td><input type="text" class="lname form-control" value="${user.lname}"></td>
                    <td><select class="admin user-cell form-control" id="manage-admin">
                        <option value="0" ${(user.admin === 0) ? 'selected' : ''}>False</option>
                        <option value="1" ${(user.admin === 1) ? 'selected' : ''}>True</option>
                    </select></td>
                    <td><button class="update-user btn btn-secondary">Update</button></td>
                    <td><button class="delete-user btn btn-secondary">Delete</button></td>
                </tr>`)
        })
    },
    error: function(response) {
        alert('#alert', response.responseJSON.msg, false)
    }
})

// Create a user
$('#create-user').click((event) => {
    event.preventDefault()
    const username = $('#user-username').val()
    const password = $('#user-password').val()
    const fname = $('#user-fname').val()
    const lname = $('#user-lname').val()
    const admin = $('#user-admin').val()

    $.ajax({
        type: 'post',
        url: '/api/user/create',
        data: {
            username,
            password,
            fname,
            lname,
            admin
        },
        success: function(response){
            alert('#alert', `Created user '${response.results.username}'`, true)
            $('#user-list').append(
                `<tr class="user" id="${response.results.id}"></td>
                    <td><input type="text" class="username form-control" value="${response.results.username}"></td>
                    <td><input type="password" class="password form-control" value="${response.results.password}"></td>
                    <td><input type="text" class="fname form-control" value="${response.results.fname}"></td>
                    <td><input type="text" class="lname form-control" value="${response.results.lname}"></td>
                    <td><select class="admin user-cell form-control" id="manage-admin">
                        <option value="0" ${(response.results.admin === 0) ? 'selected' : ''}>False</option>
                        <option value="1" ${(response.results.admin === 1) ? 'selected' : ''}>True</option>
                    </select></td>
                    <td><button type="button" class="update-user btn btn-secondary" data-toggle="modal" data-target="#myModal">Update</button></td>
                    <td><button type="button" class="delete-user btn btn-secondary" data-toggle="modal" data-target="#myModal">Delete</button></td>
                </tr>`)
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})

// Update a user
// NOTE: Need event delegation since button is placed onload
$(document).on('click', '.update-user', (event) => {
    event.preventDefault()
    updateUser.id = $(event.target).parents('tr').attr('id')
    updateUser.username = $(event.target).parents('tr').find('.username').val()
    updateUser.password = $(event.target).parents('tr').find('.password').val()
    updateUser.fname = $(event.target).parents('tr').find('.fname').val()
    updateUser.lname = $(event.target).parents('tr').find('.lname').val()
    updateUser.admin = $(event.target).parents('tr').find('.admin').val()

    $('.modal .btn-secondary').attr('id', 'update')
    $('.modal-title').empty()
    $('.modal-title').append(`Update '${updateUser.username}'?`)
    $('.modal-text').empty()
    $('.modal-text').append(`Are you sure you want to update username '<b>${updateUser.username}</b>'?`)
    $("#myModal").modal('show')
})

// Delete a building
// NOTE: Need event delegation since button is placed onload
$(document).on('click', '.delete-user', (event) => {
    event.preventDefault()
    deleteUser = $(event.target).parents('tr').attr('id')
    const username = $(event.target).parents('tr').find('.username').val()
    $('.modal .btn-secondary').attr('id', 'delete')
    $('.modal-title').empty()
    $('.modal-title').append(`Delete '${username}'?`)
    $('.modal-text').empty()
    $('.modal-text').append(`Are you sure you want to delete username '<b>${username}</b>'?`)
    $("#myModal").modal('show')
})

$('.modal .btn-secondary').click((event) => {
    $("#myModal").modal('hide')
    const operation = $(event.target).attr('id')
    if(operation === 'delete'){
        $.ajax({
            type: 'post',
            url: '/api/user/delete',
            data: {
                id: deleteUser
            },
            success: function(response){
                alert('#alert', 'Deleted user', true)
                response.results.forEach(id => {
                    $('#' + id).remove()
                })
            },
            error: function(response){
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    } else {
        const id = updateUser.id
        const username = updateUser.username
        const password = updateUser.password
        const fname = updateUser.fname
        const lname = updateUser.lname
        const admin = updateUser.admin
        $.ajax({
            type: 'post',
            url: '/api/user/update',
            data: {
                id,
                username,
                password,
                fname,
                lname,
                admin
            },
            success: function(response) {
                alert('#alert', 'Updated user', true) 
            },
            error: function(response) {
                alert('#alert', response.responseJSON.msg, false)
            }
        })
    }
})