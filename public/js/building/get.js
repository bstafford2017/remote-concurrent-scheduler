$.ajax({
    type: 'get',
    url: 'api/building',
    success: (response) => {
        console.log(response)
        $('#building-list').append(`<span class="col-sm-1">Select</span>
                                    <span class="col-sm-10">Edit Building Name</span>`)
        response.forEach(building => {
            $('#building-list').append(
                `<div class="building">
                    <input id="${building.name}-check" type="checkbox" class="checkbox">
                    <input id="${building.name}-text" type="text" class="form-control col-sm-10 offset-sm-1 d-inline" value="${building.name}">
                </div>`)
        })
    },
    error: (response) => {

    }
})