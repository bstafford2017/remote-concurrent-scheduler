$('#building').change(() => {
    const building = $('#building option:selected').text()
    
    /*$.ajax({
        type: "get",
        url: "api/event",
        data: {
            building
        }
        success: function(response){
            $('#alert').empty()
            $('#alert').append("")
            
            // Add to rooms selection
            response.forEach(element => {
                $('.id').append(element)
            });
        },
        error: function(response){
            $('#alert').empty()
            alert(response)
        }
    })*/
})