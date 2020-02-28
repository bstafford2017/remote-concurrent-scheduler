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
        response.forEach(user => {
            $('#user-list').append(
                `<tr class="user" id="${user.username.replace(' ', '_')}"></td>
                    <td><input type="text" class="form-control" value="${user.username}"></td>
                    <td><input type="password" class="form-control" value="${user.password}"></td>
                    <td><input type="text" class="form-control" value="${user.f_name}"></td>
                    <td><input type="text" class="form-control" value="${user.l_name}"></td>
                    <td><select class="form-control">
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
            $('#building-list').append(
                `<div class="user" id="${response.username.replace(' ', '_')}">
                    <input type="checkbox" class="checkbox col-1">
                    <input type="text" class="text form-control col-5 d-inline" value="${response.username}">
                    <input type="password" class="text form-control col-5 d-inline" value="${user.password}">
                    <input type="text" class="text form-control col-5 d-inline" value="${response.fname}">
                    <input type="text" class="text form-control col-5 d-inline" value="${response.lname}">
                    <select class="form-control col-2 d-inline">
                        <option value="0" ${(response.admin === 0) ? 'selected' : ''}>False</option>
                        <option value="1" ${(response.admin === 1) ? 'selected' : ''}>True</option>
                    </select>
                </div>`)
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

    const names = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        const user = {
            username: $(this).parent().attr('id').replace('_', ' '),
            password: $(this).parent().children('.text').val()
        }
        names.push(user)
    })

    $.ajax({
        type: 'post',
        url: '/api/user/update',
        data: {
            names
        },
        success: function(response) {
            response.listOfNames.forEach((name) => {
                $('#' + name).html(`<input id="${name}-check" type="checkbox" class="checkbox">
                <input id="${name}-text" type="text" class="form-control col-sm-10 offset-sm-1 d-inline" value="${name}">`)
            })
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

    const usernames = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        let name = $(this).parent().attr('id').replace('_', ' ')
        usernames.push(name)
    })

    if(usernames.length === 0) {
        alert('#manage-alert', 'Please select a name(s) to delete')
    } else {
        $.ajax({
            type: 'post',
            url: '/api/user/delete',
            data: {
                usernames
            },
            success: function(response){
                response.usernames.forEach((name) => {
                    $('#' + name.replace(' ', '_')).remove()
                })
            },
            error: function(response){
                alert('#manage-alert', response.responseJSON.msg)
            }
        })
    } 
})