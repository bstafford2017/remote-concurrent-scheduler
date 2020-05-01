// For global variables
const today = new Date()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let currentMonth = today.getMonth()
let currentYear = today.getFullYear()
let currentDate = today.getDate() - 1
let week = [0, 0, 0, 0, 0, 0, 0]
if($('#by-week').is(':checked')) {
    showWeekCalendar()
} else {
    $(".scale").hide()
    showMonthCalendar()
}

// Handles click event for changing displays
$('#by-week').click(event => {
    clear()
    $(".scale").show()
    $("#filter").show()
    showWeekCalendar()
})

$('#by-month').click(event => {
    clear()
    $(".scale").hide()
    $("#filter").hide()
    showMonthCalendar()
})

/* Reload week calendar after selection */
$(document).on('change', '#filter-room', event => {
    clear()
    showWeekCalendar()
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

    // For live GET url
    const url_string = window.location.href
    const url = new URL(url_string);
    const building = url.searchParams.get('building')
    const room = url.searchParams.get("room");

    let selectedBuilding = $('#filter-building option:selected').text()
    let selectedRoom = $('#filter-room option:selected').text()

    // If selected items aren't really selected
    if($('#filter-building option:selected').attr('disabled') === 'disabled' || 
        $('#filter-room option:selected').attr('disabled') === 'disabled') {
        selectedBuilding = null
        selectedRoom = null
    }

    let day = ("0" + date).slice(-2);
    let month = ("0" + (currentMonth + 1) % 12).slice(-2);
    $.ajax({
        type: "post",
        url: 'api/event/' + currentYear + '/' + month + '/' + day,
        data: {
            building: (building) ? building : $('#filter-building option:selected').text(),
            room: (room) ? room : $('#filter-room option:selected').text()
        },
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
            first = daysInMonth() + first
        } else {
            currentMonth--
            first = daysInMonth() + first
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
    
    let day = ("0" + date).slice(-2);
    let month = ("0" + (currentMonth + 1) % 12).slice(-2);

    // Only call for valid dates
    if(valid){
        $.ajax({
            type: "post",
            url: 'api/event/' + currentYear + '/' + month + '/' + day,
            success: (response) => {
                if(response.results.length >= 3) {
                    for(let i = 0; i < 2; i++) {
                        const event = response.results[i]
                        $("#" + date).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                            title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`) 
                        if(i === 1) {
                            $("#" + date).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                                title=\"Tooltip on top\" class=\"month-event more\">See More</div>`) 
                        }     
                    }
                } else {
                    response.results.forEach(event => {
                        $("#" + date).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                            title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`)
                    })
                }
            },
            error: function(response){
                alert('#alert', response.responseJSON.msg)
            }
        })
    }
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear)
    /*
    $.ajax({
        type: "post",
        url: 'api/event/' + currentYear + '/' + (currentMonth + 1),
        success: (response) => {
                // events = [
                //     dayEvents: [
                //         { ... }
                //     ]
                // ]
            const events = [[]]
            response.results.forEach(event => {
                let date = event.date.split('T')[0]
                let day = parseInt(date.substring(8,10))
                if(typeof events[day] !== 'undefined'){
                    events[day] = [...events[day], event]
                } else {
                    events[day] = [event]
                }
            })
            events.forEach(dayEvents => {
                if(dayEvents.length > 3) {
                    for(let i = 0; i < 2; i++) {
                        const event = dayEvents[i]
                        let date = event.date.split('T')[0]
                        let day = parseInt(date.substring(8,10))
                        $("#" + day).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                            title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`) 
                        if(i === 1) {
                            $("#" + day).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                                title=\"Tooltip on top\" class=\"month-event more\">See More</div>`) 
                        }     
                    }
                } else {
                    dayEvents.forEach(event => {
                        let date = event.date.split('T')[0]
                        let day = parseInt(date.substring(8,10))
                        $("#" + day).append(`<div data-toggle=\"tooltip\" data-placement=\"top\"
                            title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`)
                    })
                }
            })
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg)
        }
    })
    */
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
    let day = (id > 9) ? id : "0" + id
    let month = ("0" + (currentMonth + 1) % 12).slice(-2)
    $.ajax({
        type: 'post',
        url: 'api/event/' + currentYear + '/' + month + '/' + day,
        success: function(response){
            $('#event-list').empty()
            $('#event-list').append('<i>Click to manage each event</i>')
            if(response.results.length === 0) {
                $('#event-list').append('<h5 style="text-align: center">No Events</h5>');
            }
            response.results.forEach(event => {
                const startTime = event.startTime.substring(
                    (event.startTime.charAt(0) === '0') ? 1 : 0, event.startTime.length - 3)
                const endTime = event.endTime.substring(
                    (event.endTime.charAt(0) === '0') ? 1 : 0, event.endTime.length - 3)
                $('#event-list').append(
                    `<div class="event" id="${event.id}">
                        <button class="btn btn-secondary col-12" type="button"
                            data-toggle="collapse" data-target="#modal-${event.id}"
                            aria-expanded="false" aria-controls="modal-${event.id}">
                            ${event.title}
                        </button>
                        <div id="alert" style="display: none" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <div id="alert-text"></div>
                            <button type="button" class="close" aria-label="Close" onclick="$('.alert').hide()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div id="modal-${event.id}" 
                            class="card card-body collapse col-10 offset-1 mt-3">
                            <h2 style="text-align: center;">Edit</h2>
                            <small class="form-text text-muted text-center">Note: All special characters will be removed</small>
                            <div class="row parent">
                                <div class="form-group col-6">
                                    <label for="${event.id}-title">Title</label>
                                    <input type="text" class="title form-control"
                                        value="${event.title}" id="${event.id}-title" required>
                                </div>
                                <div class="form-group col-6">
                                    <label for="${event.id}-date">${event.end ? 'Start Date' : 'Date'}Date</label>
                                    <input type="date" class="date form-control"
                                        value="${event.date.split("T")[0]}" id="${event.id}-date" required>
                                </div>
                            </div>
                            <div class="row parent">
                                <div class="form-group col-6">
                                    <label for="${event.id}-building">Building</label>
                                    <select type="date" class="building text form-control"
                                        id="${event.id}-building" required>
                                    </select>
                                </div>
                                <div class="form-group col-6">
                                    <label for="${event.id}-room">Room</label>
                                    <select type="date" class="room text form-control"
                                        id="${event.id}-room" required>
                                        <option value="${event.room}">${event.number}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row parent">
                                <div class="form-group col-6">
                                    <label for="${event.id}-start">Start Time</label>
                                    <select type="date" class="start-time text form-control"
                                        id="${event.id}-start" required>
                                        <option selected disabled hidden>Select</option>
                                        <option value="6:00" ${(startTime === '6:00') ? 'selected' : ''}>6:00 am</option>
                                        <option value="7:00" ${(startTime === '7:00') ? 'selected' : ''}>7:00 am</option>
                                        <option value="8:00" ${(startTime === '8:00') ? 'selected' : ''}>8:00 am</option>
                                        <option value="9:00" ${(startTime === '9:00') ? 'selected' : ''}>9:00 am</option>
                                        <option value="10:00" ${(startTime === '10:00') ? 'selected' : ''}>10:00 am</option>
                                        <option value="11:00" ${(startTime === '11:00') ? 'selected' : ''}>11:00 am</option>
                                        <option value="12:00" ${(startTime === '12:00') ? 'selected' : ''}>12:00 pm</option>
                                        <option value="13:00" ${(startTime === '13:00') ? 'selected' : ''}>1:00 pm</option>
                                        <option value="14:00" ${(startTime === '14:00') ? 'selected' : ''}>2:00 pm</option>
                                        <option value="15:00" ${(startTime === '15:00') ? 'selected' : ''}>3:00 pm</option>
                                        <option value="16:00" ${(startTime === '16:00') ? 'selected' : ''}>4:00 pm</option>
                                        <option value="17:00" ${(startTime === '17:00') ? 'selected' : ''}>5:00 pm</option>
                                        <option value="18:00" ${(startTime === '18:00') ? 'selected' : ''}>6:00 pm</option>
                                        <option value="19:00" ${(startTime === '19:00') ? 'selected' : ''}>7:00 pm</option>
                                    </select>
                                </div>
                                <div class="form-group col-6">
                                    <label for="${event.id}-end">End Time</label>
                                    <select type="date" class="end-time text form-control"
                                        id="${event.id}-end" required>
                                        <option selected disabled hidden>Select</option>
                                        <option value="6:00" ${(endTime === '6:00') ? 'selected' : ''}>6:00 am</option>
                                        <option value="7:00" ${(endTime === '7:00') ? 'selected' : ''}>7:00 am</option>
                                        <option value="8:00" ${(endTime === '8:00') ? 'selected' : ''}>8:00 am</option>
                                        <option value="9:00" ${(endTime === '9:00') ? 'selected' : ''}>9:00 am</option>
                                        <option value="10:00" ${(endTime === '10:00') ? 'selected' : ''}>10:00 am</option>
                                        <option value="11:00" ${(endTime === '11:00') ? 'selected' : ''}>11:00 am</option>
                                        <option value="12:00" ${(endTime === '12:00') ? 'selected' : ''}>12:00 pm</option>
                                        <option value="13:00" ${(endTime === '13:00') ? 'selected' : ''}>1:00 pm</option>
                                        <option value="14:00" ${(endTime === '14:00') ? 'selected' : ''}>2:00 pm</option>
                                        <option value="15:00" ${(endTime === '15:00') ? 'selected' : ''}>3:00 pm</option>
                                        <option value="16:00" ${(endTime === '16:00') ? 'selected' : ''}>4:00 pm</option>
                                        <option value="17:00" ${(endTime === '17:00') ? 'selected' : ''}>5:00 pm</option>
                                        <option value="18:00" ${(endTime === '18:00') ? 'selected' : ''}>6:00 pm</option>
                                        <option value="19:00" ${(endTime === '19:00') ? 'selected' : ''}>7:00 pm</option>
                                    </select>
                                </div>
                            </div>
                            <!--  CANNOT USE RECUR VARIABLE IF NOT DEFINED
                                FINISH RECUR UPDATE!!!
                            -->
                            <div class="row parent recur-block" style="display: ${event.end ? 'block' : 'none'}" id="${event.recurId}">
                                <div class="form-group col-6 offset-3">
                                    <label for="${event.id}-recur-end">End Recur Date</label>
                                    <input type="date" class="form-control recur-end" 
                                        value="${event.end ? event.end.split("T")[0] : ''}" id="${event.id}-recur-end">
                                </div>
                                ${event.end ? `
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input sunday" type="checkbox" id="${event.id}-sunday" 
                                        ${(event.weekdays.charAt(0) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-sunday">Sun</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input monday" type="checkbox" id="${event.id}-monday"
                                        ${(event.weekdays.charAt(1) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-monday">Mon</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input tuesday" type="checkbox" id="${event.id}-tuesday"
                                        ${(event.weekdays.charAt(2) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-tuesday">Tues</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input wednesday" type="checkbox" id="${event.id}-wednesday"
                                        ${(event.weekdays.charAt(3) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-wednesday">Wed</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input thursday" type="checkbox" id="${event.id}-thursday"
                                        ${(event.weekdays.charAt(4) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-thursday">Thur</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input friday" type="checkbox" id="${event.id}-friday"
                                        ${(event.weekdays.charAt(5) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-friday">Fri</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input saturday" type="checkbox" id="${event.id}-saturday"
                                        ${(event.weekdays.charAt(6) === '1') ? 'checked' : ''}>
                                    <label class="form-check-label" for="${event.id}-saturday">Sat</label>
                                </div>`: ''}
                            </div>
                            <div class="row parent">
                                <button class="update btn btn-secondary col-3 offset-2">${(event.end) ? 'Update All' : 'Update'}</button>
                                <button class="delete btn btn-secondary col-3 offset-2">${(event.end) ? 'Delete All' : 'Delete'}</button>
                            </div>
                        </div>
                    </div>`)

                // Remove all end-times before start-time on load
                const start = $('#' + event.id + '-start option:selected').val()
                let hitStart = false
                $('#' + event.id + '-end > option').each(function() {
                    if(start === $(this).val()){
                        hitStart = true
                        $(this).hide()
                        return;
                    }
                    
                    if(!hitStart)
                        $(this).hide()
                    else
                        $(this).show()
                })

                // Add buildings to event
                $('#building').children().each(function(i) {
                    // Skip adding the 'select' option
                    if(i === 0) return

                    if(this.text === event.name) {
                        $('#' + event.id + '-building').append(`<option 
                            value="${this.value}" selected>${this.text}</option>`)
                    } else {
                        $('#' + event.id + '-building').append(`<option 
                            value="${this.value}">${this.text}</option>`)
                    }
                })
            })
        },
        error: function(response){
            $('.alert').children().first().append(response.responseJSON.msg)
            $('.alert').show()
        }
    })
    $('#date').val(currentYear + '-' + month + '-' + day)
    $('.view-header').empty()
    $('.view-header').append(months[currentMonth] + ' ' + id + ', ' + currentYear)
    $('#myModal').modal('show')
})