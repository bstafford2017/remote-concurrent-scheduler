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

    modal('#myModal', `Update '${user.username}'?`,
        `Are you sure you want to update username '<b>${user.username}</b>'?`,
        true) 
})

$(document).on('click', '.modal .btn-secondary', event => {
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