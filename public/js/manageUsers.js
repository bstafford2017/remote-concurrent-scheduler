function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

// Get all users
$.ajax({
    type: 'get',
    url: 'api/user',
    success: function(response) {
        response.results.forEach(user => {
            $('#user-list').append(
                `<tr class="user" id="${user.username}"></td>
                    <td><input type="text" class="username form-control" value="${user.username}"></td>
                    <td><input type="password" class="password form-control" value="${user.password}"></td>
                    <td><input type="text" class="fname form-control" value="${user.f_name}"></td>
                    <td><input type="text" class="lname form-control" value="${user.l_name}"></td>
                    <td><select class="admin user-cell" id="manage-admin">
                        <option value="0" ${(user.admin === 0) ? 'selected' : ''}>False</option>
                        <option value="1" ${(user.admin === 1) ? 'selected' : ''}>True</option>
                    </select></td>
                    <td><button class="update-user btn btn-secondary">Update</button></td>
                    <td><button class="delete-user btn btn-secondary">Delete</button></td>
                </tr>`)
        })
    },
    error: function(response) {
        $('#alert').empty()
        $('#alert').append(response.responseJSON.msg)
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
            $('#user-list').append(
                `<tr class="user" id="${response.results.username}"></td>
                    <td><input type="text" class="username form-control" value="${response.results.username}"></td>
                    <td><input type="password" class="password form-control" value="${response.results.password}"></td>
                    <td><input type="text" class="fname form-control" value="${response.results.fname}"></td>
                    <td><input type="text" class="lname form-control" value="${response.results.lname}"></td>
                    <td><select class="admin user-cell" id="manage-admin">
                        <option value="0" ${(response.results.admin === 0) ? 'selected' : ''}>False</option>
                        <option value="1" ${(response.results.admin === 1) ? 'selected' : ''}>True</option>
                    </select></td>
                    <td><button type="button" class="update-user btn btn-secondary" data-toggle="modal" data-target="#myModal">Update</button></td>
                    <td><button type="button" class="delete-user btn btn-secondary" data-toggle="modal" data-target="#myModal">Delete</button></td>
                </tr>`)
        },
        error: function(response){
            alert('#create-alert', response.responseJSON.msg)
        }
    })
})

// Update a user
// NOTE: Need event delegation since button is placed onload
$(document).on('click', '.update-user', (event) => {
    event.preventDefault()

    // Add more complex modal
    if(!window.confirm('Are you sure you want to update user(s)?')){
        return
    }

    const oldUsername = $(this).parent().parent().attr('id')
    const newUsername = $(this).parent().parent().find('.username').val()
    const password = $(this).parent().parent().find('.pasword').val()
    const fname = $(this).parent().parent().find('.fname').val()
    const lname = $(this).parent().parent().find('.lname').val()
    const admin = $(this).parent().parent().find('.admin').val()

    console.log(oldUsername + newUsername + password + fname + lname + admin)

    $.ajax({
        type: 'post',
        url: '/api/user/update',
        data: {
            oldUsername,
            newUsername,
            password,
            fname,
            lname,
            admin
        },
        success: function(response) {
            $('#' + oldUsername).remove()
        },
        error: function(response) {
            alert('#manage-alert', response.responseJSON.msg)
        }
    })
})

// Delete a building
// NOTE: Need event delegation since button is placed onload
$(document).on('click', '.delete-user', (event) => {
    event.preventDefault()
    const username = $(event.target).parents('tr').attr('id')
    $('.modal .btn-secondary').attr('id', username.replace('_', ' '))
    $('.modal-title').append(`Delete '${username}'?`)
    $('.modal-text').append(`Are you sure you want to delete username '<b>${username}</b>'?`)
    $("#myModal").modal('show')
})

$('.modal .btn-secondary').click((event) => {
    $("#myModal").modal('hide')
    const username = $(event.target).attr('id')
    $.ajax({
        type: 'post',
        url: '/api/user/delete',
        data: {
            username
        },
        success: function(response){
            response.results.forEach((username) => {
                $('#' + username.replace(' ', '_')).remove()
            })
        },
        error: function(response){
            alert('#manage-alert', response.responseJSON.msg)
        }
    })
})