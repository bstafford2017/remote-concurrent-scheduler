$('#create-event').click(event => {
    event.preventDefault()
    const title = $('#title').val()
    const building = $('#building').val()
    const room = $('#room').val()
    const date = $('#date').val()
    const start = $('#start-time option:selected').val()
    const end = $('#end-time option:selected').val()
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
        },
        success: function(response){
            $('.view').append(
                `<div class="" id="${response.results.id}">
                    <input type="text" class="text form-control col-10 d-inline" value="${response.results.title}">
                </div>`)
            console.log(response.results)
            let day = parseInt(response.results.date.substring(8,10))
            console.log(day)
            $("#" + day).append(`<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Tooltip on top\" class=\"month-event\">${response.results.title}</div>`)       
            $('#myModal').modal('hide')
        },
        error: function(response){
            $('#alert').empty()
            $('#alert').append(response)
        }
    })
    
})