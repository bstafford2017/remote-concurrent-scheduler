// For global variables
const today = new Date()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let currentMonth = today.getMonth()
let currentYear = today.getFullYear()
let currentDate = today.getDate() - 1
let week = [0, 0, 0, 0, 0, 0, 0]
$(".scale").hide()
showMonthCalendar()

// Handles click event for changing displays
$('#by-week').click(event => {
    clear()
    $(".scale").show();
    showWeekCalendar()
})

$('#by-month').click(event => {
    clear()
    $(".scale").hide()
    showMonthCalendar()
})

function clear(){
    $('.row').remove()
    $('.month-by-month').empty()
    $('#month').empty()
}

function daysInMonth(){
    return 32 - new Date(currentYear, currentMonth, 32).getDate()
}

function daysInNextMonth(){
    if(currentMonth - 1 < 0){
        return 32 - new Date(currentYear - 1, 11, 32).getDate()
    } else {
        return 32 - new Date(currentYear, currentMonth - 1, 32).getDate()
    }
}

function daysInPreviousMonth(){
    if(currentMonth - 1 < 11){
        return 32 - new Date(currentYear + 1, 0, 32).getDate()
    } else {
        return 32 - new Date(currentYear, currentMonth - 1, 32).getDate()
    }
}

function next() {
    // Checks whether in weekly or monthly mode
    if($('input[name=\'selector\']:checked').val() === "week"){
        showWeekCalendar(true)
    } else {
        clear()
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear
        currentMonth = (currentMonth + 1) % 12
        showMonthCalendar()
    }
}

function previous() {
    if(Math.abs(week[0] - week[6]) > 7){
        if(currentMonth === 0){
            currentMonth = 11
            currentYear--
        } else {
            currentMonth--
        }
    }

    // Checks whether in weekly or monthly mode
    if($('input[name=\'selector\']:checked').val() === "week"){
        showWeekCalendar(false)
    } else {
        clear()
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1
        showMonthCalendar()
    }
}

function changeHeader(month, year){
    $('#month').empty()
    $('#month').append(months[month] + " " + year)
}

function addToHeader(monthToAdd, yearToAdd){
    $('#month').append("/" + months[monthToAdd] + " " + yearToAdd)
}

function changeAndCheck(valueToCheck, changeToValue){
    //console.log("before increment: " + valueToCheck + " " + currentMonth + " " + currentYear)
    valueToCheck = valueToCheck + changeToValue
    // Handles if negative value
    if(valueToCheck < 0){
        changeHeader(currentMonth, currentYear)
        if(currentMonth === 0) {
            currentMonth = 11
            currentYear--
        } else {
            currentMonth--
        }
        valueToCheck += daysInMonth()
        addToHeader(currentMonth, currentYear)
    } else if(valueToCheck > daysInMonth()){
        changeHeader(currentMonth, currentYear)
        valueToCheck -= daysInMonth()
        if(currentMonth === 11) {
            currentMonth = 0
            currentYear++
        } else {
            currentMonth++
        }
        addToHeader(currentMonth, currentYear)
    }
    //console.log("after increment: " + valueToCheck + " " + currentMonth + " " + currentYear)
    return valueToCheck
}

function printWeek(date){
    if(today.getDate() === date & today.getMonth() === currentMonth && today.getFullYear() === currentYear){
        $("#0").append("<div id=\"" + date + "\" class=\"active-date valid\">" + date)
    } else {
        $("#0").append("<div id=\"" + date + "\" class=\"valid\">" + date)        
    }

    let day = ("0" + date).slice(-2);
    let month = ("0" + (currentMonth + 1) % 12).slice(-2);
    $.ajax({
        type: "get",
        url: 'api/event/' + currentYear + '/' + month + '/' + day,
        success: (response) => {
            response.results.forEach(event => {
                const start = event.startTime.split(':')[0]
                const end = event.endTime.split(':')[0]
                const diff = end - start
                $("#" + date).append("<div class=\"week-event\" style=\"margin-top:" + (start - 6) *
                    $('.scale div').outerHeight() + "px; height: " + diff * 
                    $('.scale div').outerHeight() + "px; width: " + $('.valid').width() + 
                    "px;position: absolute;\">" + event.title + "</div>")
            })    
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg)
        }
    })
    $("#0").append("</div>")
}

function showWeekCalendar(positive){
    $('.row').remove()
    $('.week-by-week').append("<div id=\"0\" class=\"row\">")

    if(typeof positive === 'undefined'){
        // Make sure week has been populated at least once
        if(week[0] === 0){
            showWeekCalendar(true)
        } else {
            // Update header
            if(Math.abs(week[0] - week[6]) > 7){
                changeHeader(currentMonth - 1, currentYear)
                addToHeader(currentMonth, currentYear)
            } else {
                changeHeader(currentMonth, currentYear)
            }
            week.forEach(day => printWeek(day))
        }
        return
    }

    // If on today's week, keep first as this
    let first = today.getDate() - today.getDay()
    if(first < 0){
        if(currentMonth === 0){
            currentMonth = 11
            currentYear--
            first = daysInMonth + first
        } else {
            currentMonth--
            first = daysInMonth + first
        }
    }
    
    // Check if 'prev' or 'next' has been clicked
    if(week[0] !== 0){
        first = (positive) ? changeAndCheck(week[6], 1) : changeAndCheck(week[0], -7)
    }

    // Set days for the week
    for(let i = 0; i < 7; i++){
        week[i] = first
        printWeek(first)
        // Do NOT increment if last iteration, already incremented at start
        if(i !== 6){
            first = changeAndCheck(first, 1)
        }
    }

    // Update header
    if(Math.abs(week[0] - week[6]) <= 7){
        changeHeader(currentMonth, currentYear)
    }

    $('.week-by-week').append("</div>")
}

function printMonth(active, valid, row, date){
    if(active && valid){
        $("#row-" + row).append("<div id=\"" + date + "\" class=\"active-date valid\">" + date)
    } else if(valid){
        $("#row-" + row).append("<div id=\"" + date + "\" class=\"valid\">" + date)
    } else {
        $("#row-" + row).append("<div class=\"invalid\">" + date)
    }
    $("#row-" + row).append("</div>")
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear)

    $.ajax({
        type: "get",
        url: 'api/event/' + currentYear + '/' + (currentMonth + 1),
        success: (response) => {
            response.results.forEach(event => {
                let date = event.date.split('T')[0]
                let day = parseInt(date.substring(8,10))
                $("#" + day).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                    title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`)       
            })
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg)
        }
    })

    let firstDay = (new Date(currentYear, currentMonth)).getDay()
    let table = $('.month-by-month')

    let date = 1 // Change to Date so you can compare dates for active (easier)
    for (let i = 0; i < 6; i++) {

        // In order to stop from printing last row blank
        if(date <= daysInMonth()){
            table.append("<div id=\"row-" + i + "\" class=\"row\">") 
        }

        let nextMonth = 1
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                printMonth(false, false, i, daysInPreviousMonth() - (firstDay - j) + 1)
            } else if(date > daysInMonth()){
                printMonth(false, false, i, nextMonth)
                nextMonth++
            } else {
                if (date === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    printMonth(true, true, i, date)
                } else {
                    printMonth(false, true, i, date)
                }
                date++
            }
        }

        // In order to stop from printing last row blank
        if(date <= daysInMonth()){
            table.append("</div>") 
        }

        if(i === 5){
            $('#spinner').hide()
        }
    }
}

$(document).on('click', '.valid', event => {
    let id = $(event.target).attr('id')
    if(typeof id === 'undefined') {
        id = $(event.target).parent().attr('id')
    }
    let day = (id > 9) ? id : "0" + id;
    let month = ("0" + (currentMonth + 1) % 12).slice(-2);
    $.ajax({
        type: 'get',
        url: 'api/event/' + currentYear + '/' + month + '/' + day,
        success: function(response){
            $('#event-list').empty()
            if(response.results.length == 0) {
                $('#event-list').append('<h5 style="text-align: center">No Events</h5>');
            }
            response.results.forEach(event => {
                $('#event-list').append(
                    `<div class="event">
                        <button class="btn btn-secondary col-12" type="button"
                            data-toggle="collapse" data-target="#modal-${event.id}"
                            aria-expanded="false" aria-controls="modal-${event.id}">
                            ${event.title}
                        </button>
                        <div id="modal-${event.id}" 
                            class="card card-body collapse col-10 offset-1 mt-3">
                            <h2 style="text-align: center;">Edit</h2>
                            <div class="row">
                                <div class="form-group col-6">
                                    <label for="${event.id}-title">Title</label>
                                    <input type="text" class="text form-control"
                                        value="${event.title}" id="${event.id}-title">
                                </div>
                                <div class="form-group col-6">
                                    <label for="${event.id}-date">Date</label>
                                    <input type="date" class="text form-control"
                                        value="${event.date.split("T")[0]}" id="${event.id}-date">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-6">
                                    <label for="${event.id}-building">Building</label>
                                    <select type="date" class="text form-control"
                                        id="${event.id}-building">
                                        <option>${event.name}</option>
                                    </select>
                                </div>
                                <div class="form-group col-6">
                                    <label for="${event.id}-room">Room</label>
                                    <select type="date" class="text form-control"
                                        id="${event.id}-room">
                                        <option>${event.number}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-6">
                                    <label for="${event.id}-start">Start Time</label>
                                    <select type="date" class="text form-control"
                                        id="${event.id}-start">
                                        <option>${event.startTime}</option>
                                    </select>
                                </div>
                                <div class="form-group col-6">
                                    <label for="${event.id}-end">End Time</label>
                                    <select type="date" class="text form-control"
                                        id="${event.id}-end">
                                        <option>${event.endTime}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <button class="btn btn-secondary col-3 offset-2">Update</button>
                                <button class="btn btn-secondary col-3 offset-2">Delete</button>
                            </div>
                        </div>
                    </div>`)
            })
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg)
        }
    })
    $('#date').val(currentYear + '-' + month + '-' + day)
    $('.view-header').empty()
    $('.view-header').append(months[currentMonth] + ' ' + id + ', ' + currentYear)
    $('#myModal').modal('show')
})