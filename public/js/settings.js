function alert(selector, text, success){
    $(selector).removeClass(success ? 'alert-danger' : 'alert-success')
    $(selector).addClass(success ? 'alert-success' : 'alert-danger')
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
    $(selector).show()
}

function modal(id, title, body, update) {
    if(typeof update === 'undefined') {
        $(id).find('.btn-secondary').attr('id', 'create')
    } else if(update) {
        $(id).find('.btn-secondary').attr('id', 'update')
    } else {
        $(id).find('.btn-secondary').attr('id', 'delete')
    }
    $(id).find('.modal-title').empty()
    $(id).find('.modal-title').append(title)
    $(id).find('.modal-text').empty()
    $(id).find('.modal-text').append(body)
    $(id).modal('show')
}

function isInvalid(str){
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

// Global values
let user = {}

// Admin navbar
$.ajax({
    type: "get",
    url: "api/user/admin",
    success: function(response){
        if(response.admin === 'true'){
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageBuildings.html">Manage Buildings</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageRooms.html">Manage Rooms</a></li>')
            $('#left-nav').append('<li class="nav-item"><a class="nav-link" href="manageUsers.html">Manage Users</a></li>')
        }
    },
    error: function(response) {
        alert('#alert', response.responseJSON.msg, false)   
    }
})


// Get user data
$.ajax({
    type: 'post',
    url: 'api/user',
    success: function(response) {
        user = response.results
        $('#username').val(response.results.username)
        $('#password').val(response.results.password)
        $('#confirm-password').val(response.results.password)
        $('#fname').val(response.results.fname)
        $('#lname').val(response.results.lname)
        $('#admin').append(response.results.admin ? 'Yes' : 'No')
        $('#spinner').hide()
    },
    error: function(response) {
        $('#spinner').hide()
        alert('#alert', response.responseJSON.msg, false)
    }
})

$(document).on('click', '#manage-user', event => {
    event.preventDefault()

    user.username = $('#username').val()
    user.password = $('#password').val()
    user.fname = $('#fname').val()
    user.lname = $('#lname').val()
    user.admin = $('#admin').val()
    
    if(user.password !== $('#confirm-password').val()) {
        alert('#alert', 'Passwords do not match', false)
        return
    }

    // Check for special characters
    if(Object.values(user).some(field => isInvalid(field))) {
        modal('#myModal', 'Fields contain special characters',
            'These special characters will be remove. Are you sure you want to continue?')
        return
    }

    modal('#myModal', `Update '${user.username}'?`,
        `Are you sure you want to update username '<b>${user.username}</b>'?`,
        true) 
})

$(document).on('click', '.modal .btn-secondary', event => {
    $("#myModal").modal('hide')
    const id = user.id
    const username = $('#username').val()
    const password = $('#password').val()
    const fname = $('#fname').val()
    const lname = $('#lname').val()
    const admin = user.admin
    $.ajax({
        type: 'post',
        url: 'api/user/update',
        data: {
            id,
            username,
            password,
            fname,
            lname,
            admin
        },
        success: function(response) {
            $("#myModal").modal('hide')
            alert('#alert', 'Updated settings', true)
        },
        error: function(response) {
            alert('#alert', response.responseJSON.msg, false)
        }
    })
})