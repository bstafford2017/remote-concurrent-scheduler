// For global variables
const today = new Date()
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let currentMonth = today.getMonth()
let currentYear = today.getFullYear()
let currentDate = today.getDate() - 1
let week = [0, 0, 0, 0, 0, 0, 0]
showMonthCalendar()

// Handles click event for changing displays
$('#by-week').click(() => {
    clear()
    showWeekCalendar(true)
})

$('#by-month').click(() => {
    clear()
    showMonthCalendar()
})

function clear() {
    $('.week-by-week').empty()
    $('.month-by-month').empty()
    $('#month').empty()
}

function daysInMonth(){
    return 32 - new Date(currentYear, currentMonth, 32).getDate()
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
    $('#month').append(months[month] + "<br/><span>" + year + "</span>")
}

function addToHeader(monthToAdd, yearToAdd){
    $('#month').append("/" + months[monthToAdd] + "<br/><span>" + yearToAdd + "</span>")
}

function printWeek(date){
    if(today.getDate() === date & today.getMonth() === currentMonth && today.getFullYear() === currentYear){
        $("#" + i).append("<div class=\"active valid\">" + date)
    } else {
        $("#" + i).append("<div class=\"valid\">" + date)        
    }
    $.ajax({
        type: "get",
        url: "../../api/scripts/event/list.php",
        data: {
            date: date,
            month: currentMonth,
            year: currentYear
        },
        success: (response) => {
            $("#" + i).append(response)        

        }
    })
    $("#" + i).append("</div>")
}

// NEEDS TO HANDLE NEGATIVE
function changeAndCheck(valueToCheck, changeToValue){
    console.log("before increment: " + valueToCheck + " " + currentMonth + " " + currentYear)
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
    console.log("after increment: " + valueToCheck + " " + currentMonth + " " + currentYear)
    return valueToCheck
}

function showWeekCalendar(positive){
    $('.week-by-week').empty()
    $('.week-by-week').append("<div class=\"row\">")

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
    console.log("first day: " + first + " " + currentMonth + " " + currentYear)

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
    console.log(week)
    $('.week-by-week').append("</div>")
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear)

    let firstDay = (new Date(currentYear, currentMonth)).getDay()
    let table = $('.month-by-month')

    let date = 1 // Change to Date so you can compare dates for active (easier)
    for (let i = 0; i < 6; i++) {
        table.append("<div id=\"" + i + "\" class=\"row\">")
        for (let j = 0; j < 7; j++) {
            // Border must be the same as table background
            if (i === 0 && j < firstDay) {
                $("#" + i).append("<div style=\"border: solid 1px " + $('.table').css("background-color") + "\"></div>")
            }
            else if (date > daysInMonth()) {
                for(;j < 7; j++){
                    $("#" + i).append("<div style=\"border: solid 1px " + $('.table').css("background-color") + "\"></div>")
                }
                break
            }
            else {
                if (date === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    $("#" + i).append("<div class=\"active valid\">" + date + "</div>")
                } else {
                    $("#" + i).append("<div class=\"valid\">" + date + "</div>")
                }
                date++
            }
        }
        table.append("</div>")
    }
}