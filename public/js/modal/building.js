$.ajax({
    type: "get",
    url: "api/building",
    success: function(response){
        response.results.forEach(building => {
            $('#building').append("<option>" + building.name + "</option>")
        })
    },
    error: function(response){
        $('#alert').empty()
        $('#alert').append(response)
    }
})

$('#building').change(event => {
    const building = $('#building option:selected').text()
    
    $.ajax({
        type: "get",
        url: "api/room/" + building,
        success: function(response){
            response.results.forEach(room => {
                $('#room').empty()
                $('#room').append("<option>" + room.number + "</option>")
            })
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
})

$('#start-time').click(event => {
    const start = $(event.target).val()
    $("#end-time > option").each(function() {
        //if(start )
        $(this).hide()
    })
})