// Get all users
$.ajax({
    type: 'get',
    url: 'api/user',
    success: function(response) {
        response.forEach(user => {
            $('#user-list').append(
                `<tr class="user" id="${user.username}"></td>
                    <td><input type="text" class="form-control" value="${user.username}"></td>
                    <td><input type="password" class="form-control" value="${user.password}"></td>
                    <td><input type="text" class="form-control" value="${user.f_name}"></td>
                    <td><input type="text" class="form-control" value="${user.l_name}"></td>
                    <td><select class="form-control">
                        <option value="0" ${(user.admin === 0) ? 'selected' : ''}>False</option>
                        <option value="1" ${(user.admin === 1) ? 'selected' : ''}>True</option>
                    </select></td>
                    <td><button class="btn btn-primary">Update</button></td>
                    <td><button class="btn btn-primary">Delete</button></td>
                </tr>`)
        })
    },
    error: function(response) {
        $('#alert').empty()
        $('#alert').append(response)
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
    if(!username || !password || !fname || !lname || !admin) {
        $('#alert').empty()
        $('#alert').append("Invalid entry")
    }
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
                `<div class="user" id="${response.username}">
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
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})

// Update a user
$('#update-user').click((event) => {
    event.preventDefault()

    const users = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        const updatedUser = {
            username: $(this).parent().attr('id'),
            password: $(this).parent().children('.text').val()
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
        url: '/api/user/update',
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

/* NEED TO ACCOUNT FOR SPACES IN NAME! */

// Delete a building
$('#delete-user').click((event) => {
    event.preventDefault()

    const usernames = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        let name = $(this).parent().attr('id')
        usernames.push(name)
    })

    if(usernames.length === 0) {
        $('#alert').empty()
        $('#alert').append("Please select a name(s) to delete")
    }
    $.ajax({
        type: 'post',
        url: '/api/user/delete',
        data: {
            usernames
        },
        success: function(response){
            response.usernames.forEach((name) => {
                $('#' + name).remove()
            })
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})