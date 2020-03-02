function alert(selector, text){
    $(selector).show()
    $(selector + '-text').empty()
    $(selector + '-text').append(text)
}

// Global values
let user = {}

// Get user data
$.ajax({
    type: 'post',
    url: 'api/user',
    data: {
        
    },
    success: function(response) {
        user = response.results
        $('#username').val(response.results.username)
        $('#password').val(response.results.password)
        $('#confirm-password').val(response.results.password)
        $('#fname').val(response.results.fname)
        $('#lname').val(response.results.lname)
        $('#admin').append(response.results.admin ? 'Yes' : 'No')
    },
    error: function(response) {
        $('#alert').empty()
        $('#alert').append(response.responseJSON.msg)
    }
})

$('#manage-user').click(event => {
    event.preventDefault()
    $('.modal .btn-secondary').attr('id', 'delete')
    $('.modal-title').empty()
    $('.modal-title').append(`Update '${user.username}'?`)
    $('.modal-text').empty()
    $('.modal-text').append(`Are you sure you want to update username '<b>${user.username}</b>'?`)
    $("#myModal").modal('show')
})

$('.modal .btn-secondary').click(event => {
    const id = user.id
    const username = $('#username').val()
    const password = $('#password').val()
    const fname = $('#fname').val()
    const lname = $('#lname').val()
    const admin = user.admin
    $("#myModal").modal('hide')
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
            
        },
        error: function(response) {
            alert('#manage-card', response.responseJSON.msg.sqlMessage)
        }
    })
})