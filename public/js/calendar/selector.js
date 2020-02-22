let clicked = false
let previousId = -1

/* Handles click event for day */
/*$('.valid').mouseenter((event) => {
    $('#' + event.target.id + '>.month-event').hide()
    $('#' + event.target.id + '>.week-event').hide()
    $('#' + event.target.id).append("<div class=\"item\">Create Event</div>")
    $('#' + event.target.id).append("<div class=\"item\">See More</div>")
})

$('.valid').mouseleave((event) => {
    $('.item').remove()
    $('#' + event.target.id + '>.month-event').show()
    $('#' + event.target.id + '>.week-event').show()
})*/

function resetElement() {
    $('#' + previousId + '>.week-event').show()
    $('#' + previousId + '>.month-event').show()
    $('.item').remove()
    clicked = false
}

// Handles clicked event
$(document).click((event) => {

    // Check if clicked or not
    if(!clicked){
        if(event.target.id > 0){
            $('#' + event.target.id + '>.month-event').hide()
            $('#' + event.target.id + '>.week-event').hide()
            $('#' + event.target.id).append("<button type=\"button\" id=\"create-event-btn\" class=\"item\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">Create Event</button>")
            $('#' + event.target.id).append("<button type=\"button\" id=\"see-more-btn\" class=\"item\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">See More</button>")
            previousId = event.target.id
            clicked = true;
        } else {
            resetElement()
        }
    } else {
        resetElement()
    }
})