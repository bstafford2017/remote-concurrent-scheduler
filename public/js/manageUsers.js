function alert(selector, text, success){
    $(selector).removeClass(success ? 'alert-danger' : 'alert-success')
    $(selector).addClass(success ? 'alert-success' : 'alert-danger')
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

function modal(id, title, body, update) {
    $(id).find('.modal .btn-secondary').attr('id', 
        (update) ? 'update' : 'delete')
    $(id).find('.modal-title').empty()
    $(id).find('.modal-title').append(title)
    $(id).find('.modal-text').empty()
    $(id).find('.modal-text').append(body)
    $(id).modal('show')
}

// Global variable
let updateUser = {}
let deleteUser = ''

// Admin navbar
$.ajax({
    type: "get",
    url: "api/user/admin",
    success: function(response){
        if(response.admin === 'true'){
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageBuildings.html">Manage Buildings</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageRooms.html">Manage Rooms</a></li>')
            $('#left-nav').append('<li class="nav-item active"><a class="nav-link" href="manageUsers.html">Manage Users</a></li>')
        }
    },
    error: function(response) {
        alert('#alert', response.responseJSON.msg, false)   
    }
})

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
        $('#spinner').hide()
    },
    error: function(response) {
        $('#spinner').hide()
        alert('#alert', response.responseJSON.msg, false)
    }
})

// Create a user
$(document).on('click', '#create-user', event => {
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
            $('#user-username').val('')
            $('#user-password').val('')
            $('#user-fname').val('')
            $('#user-lname').val('')
            $('#user-admin').val('')
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})

// Update a user
$(document).on('click', '.update-user', (event) => {
    event.preventDefault()
    updateUser.id = $(event.target).parents('tr').attr('id')
    updateUser.username = $(event.target).parents('tr').find('.username').val()
    updateUser.password = $(event.target).parents('tr').find('.password').val()
    updateUser.fname = $(event.target).parents('tr').find('.fname').val()
    updateUser.lname = $(event.target).parents('tr').find('.lname').val()
    updateUser.admin = $(event.target).parents('tr').find('.admin').val()

    modal('#myModal', `Update '${updateUser.username}'?`,
        `Are you sure you want to update username '<b>${updateUser.username}</b>'?`,    
        true)
})

// Delete a building
$(document).on('click', '.delete-user', (event) => {
    event.preventDefault()
    deleteUser = $(event.target).parents('div').attr('id')
    const username = $(event.target).parents('tr').find('.username').val()

    modal('#myModal', `Delete '${username}'?`,
        `Are you sure you want to delete username '<b>${username}</b>'?`,    
        false)

})

$(document).on('click', '.modal .btn-secondary', event => {
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