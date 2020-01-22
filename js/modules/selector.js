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

// Handles clicked event
$(document).click((event) => {

    // Check if clicked or not
    if(!clicked){
        $('#' + event.target.id + '>.month-event').hide()
        $('#' + event.target.id + '>.week-event').hide()
        $('#' + event.target.id).append("<button type=\"button\" class=\"item\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">Create Event</button>")
        $('#' + event.target.id).append("<button type=\"button\" class=\"item\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">See More</button>")
        previousId = event.target.id
        clicked = true;
    } else {
        $('#' + previousId + '>.week-event').show()
        $('#' + previousId + '>.month-event').show()
        $('.item').remove()
        clicked = false
    }

    // Check if id and class are defined
    /*if(event.target.id && $(event.target).attr('class')){
        // Check if cell is clicked
        if($(event.target).attr('class').includes("valid")){
            // If something is not selected (clicked)
            if(!clicked){
                $('#' + event.target.id + '>.month-event').hide()
                $('#' + event.target.id + '>.week-event').hide()
                $('#' + event.target.id).append("<button type=\"button\" class=\"item\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">Create Event</button>")
                $('#' + event.target.id).append("<button type=\"button\" class=\"item\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\">See More</button>")
                clicked = true;
            } else {

                // If clicked same cell
                if(event.target.id !== previousId){
                    $('#' + previousId + '>.week-event').show()
                    $('#' + previousId + '>.month-event').show()
                    $('.item').remove()
                    clicked = false
                }
            }
        } else {
            $('#' + previousId + '>.week-event').show()
            $('#' + previousId + '>.month-event').show()
            $('.item').remove()
            clicked = false
        }
        previousId = event.target.id
    } else {
        $('#' + previousId + '>.week-event').show()
        $('#' + previousId + '>.month-event').show()
        $('.item').remove()
        clicked = false
    }*/
})