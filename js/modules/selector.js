let clicked = false
let element = null

// Handles clicking of a day
$('.valid').click(() => {
    clicked = true;
    let id = event.target.id
    element = $("#" + id)
    
    // Create Event
    element.append("<div class=\"item\">Create Event</div>")

    // See More
    element.append("<div class=\"item\">See More</div>")
})

$('html').click(() => {
    if(clicked){
        $('.item').hide()
        element.show()
        clicked = false
    }
})