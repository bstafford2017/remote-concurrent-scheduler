$('#create-event').click(event => {
    const title = $('#title').val()
    const building = $('#building').val()
    const room = $('#room').val()
    const date = $('#date').val()
    const start = $('#start-time').val()
    const end = $('#end-time').val()
    const recur = $('#recur-end').val()
    $.ajax({
        type: "post",
        url: "api/event",
        data: {
            title,
            building,
            room,
            date,
            start,
            end,
            recur
        }
        ,success: function(response){
            response.results.forEach(event => {
                $('#building').append("<option>" + building.name + "</option>")
            })
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
    
})