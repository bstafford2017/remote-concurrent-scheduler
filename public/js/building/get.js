$.ajax({
    type: 'get',
    url: 'api/building',
    success: (response) => {
        console.log(response)
        $('#building-list').append('<p>Edit Building Name</p>')
        response.forEach(building => {
            $('#building-list').append(
                `<div class="building">
                    <input type="text" class="text form-control col-sm-9" value="${building.name}">
                    <button class="btn btn-danger col-sm-2 offset-sm-1">Delete</button
                </div>`)
        })
    },
    error: (response) => {

    }
})