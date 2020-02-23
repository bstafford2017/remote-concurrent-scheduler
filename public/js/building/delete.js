$('#create-building').click((event) => {
    
    $.ajax({
        type: 'delete',
        url: 'api/building',
        data: {
            name: $('')
        },
        success: (response) => {
            console.log(response)
            response.forEach(building => {
                $('#building-list').append(`<div>${building.name}</div>`)
            })
        },
        error: (response) => {

        }
    })
}