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
                $("#" + date).append(`<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`)       
            })    
        },
        error: function(response){
            alert('#alert', response.responseJSON.msg)
        }
    })
    $("#0").append("</div>")
    //$("#" + date).append("<div class=\"week-event\" style=\"margin-top:" + 9 * $('.scale div').outerHeight() + "px; height: " + $('.scale div').outerHeight() + "px;\">ACM Meeting</div>")
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
    //console.log("first day: " + first + " " + currentMonth + " " + currentYear)

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
            type: "get",
            url: 'api/event/' + currentYear + '/' + month + '/' + day,
            success: (response) => {
                response.results.forEach(event => {
                    $("#" + date).append(`<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Tooltip on top\" class=\"month-event\">${event.title}</div>`)       
                })    
            },
            error: function(response){
                alert('#alert', response.responseJSON.msg)
            }
        })
    }
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear)

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

$('.valid').on('click', event => {
    console.log(event)
    let id = $(event.target).attr('id')
    let day = ("0" + id).slice(-2);
    let month = ("0" + (currentMonth + 1) % 12).slice(-2);
    $('.view').empty()
    $.ajax({
        type: 'get',
        url: 'api/event/' + currentYear + '/' + month + '/' + day,
        success: function(response){
            response.results.forEach(event => {
                $('.view').append(
                    `<div class="row" id="${event.id}">
                        <input type="text" class="text form-control col-10 d-inline" value="${event.title}">
                        <button class="btn btn-secondary col-2">Delete</button>
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

//$(document).on('click', (event) => console.log(event))