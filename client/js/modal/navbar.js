$('#view-tab').click((event) => {

    $('.view').show()
    $('.create').hide()
    $('#create-tab').removeClass('active')
    $('#view-tab').addClass('active')

    /*$.ajax({
        type: "get",
        url: "api/event",
        success: function(response){
            $('#alert').empty()
            $('#alert').append("")
            
            // Loop through array response
            response.forEach(element => {
                $('.view').append(element)
            });
        },
        error: function(response){
            $('#alert').empty()
            alert(response)
        }
    })*/
})

$('#create-tab').click((event) => {

    $('.create').show()
    $('.view').hide()
    $('#view-tab').removeClass('active')
    $('#create-tab').addClass('active')

    /*$.ajax({
        type: "get",
        url: "api/event",
        success: function(response){
            $('#alert').empty()
            $('#alert').append("")
            
            // Loop through array response
            response.forEach(element => {
                $('.view').append(element)
            });
        },
        error: function(response){
            $('#alert').empty()
            alert(response)
        }
    })*/
})