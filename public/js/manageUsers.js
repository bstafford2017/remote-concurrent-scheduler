function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

function filter(object){
    return Object.values(object).some(field => {
        field.replace(' ', '').replace === ''
    })
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
        $('#alert').append(response)
    }
})

// Create a user
$('#create-user').click((event) => {
    event.preventDefault()
    const user = {
        username: $('#user-username').val(),
        password: $('#user-password').val(),
        fname: $('#user-fname').val(),
        lname: $('#user-lname').val(),
        admin: $('#user-admin').val()
    }

    if(Object.values(user).some(field => field.replace('_', ' ') === '')) {
        alert('#create-alert', 'Please enter a valid value')
    }
    $.ajax({
        type: 'post',
        url: '/api/user/create',
        data: {
            username: user.username,
            password: user.password,
            fname: user.fname,
            lname: user.lname,
            admin: user.admin
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
            alert('#create-alert', response)
        }
    })
})

// Update a user
$('.update-user').click((event) => {
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
        alert('#manage-alert', 'Please enter a valid name')
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
            alert('#manage-alert', response)
        }
    })
})

/* NEED TO ACCOUNT FOR SPACES IN NAME! */

// Delete a building
$('.delete-user').click((event) => {
    event.preventDefault()

    const usernames = []
    $('#manage-card').find('input:checkbox:checked').each(function() {
        let name = $(this).parent().attr('id').replace('_', ' ')
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
                $('#' + name.replace(' ', '_')).remove()
            })
        },
        error: function(response){
            alert('#manage-alert', response)
        }
    })
})