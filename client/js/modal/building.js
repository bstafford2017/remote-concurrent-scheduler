$.ajax({
    type: "get",
    url: "api/building",
    success: function(response){
        response.forEach(element => {
            $('#building').append("<option>" + element + "</option>")
        })
    },
    error: function(response){
        $('#alert').empty()
        $('#alert').append(response)
    }
})

$('#building').change(() => {
    const building = $('#building option:selected').text()
    
    $.ajax({
        type: "get",
        url: "api/room",
        data: {
            building
        },
        success: function(response){
            response.forEach(element => {
                $('#room').empty()
                $('#room').append("<option>" + element + "</option>")
            })
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})