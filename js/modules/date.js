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
    showWeekCalendar(true)
})

$('#by-month').click(() => {
    showMonthCalendar()
})

function clear() {
    $('#week-by-week').empty()
    $('#month-by-month').empty()
    $('#month').empty()
}

function daysInMonth(){
    return 32 - new Date(currentYear, currentMonth,32).getDate()
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
        $('#week-by-week').append("<td class=\"active\">" + date + "</td>")        
    } else {
        $('#week-by-week').append("<td>" + date + "</td>")        
    }
}

function incrementCheck(date, increment){
    console.log("before increment: " + date + " " + currentMonth + " " + currentYear)
    date = (increment) ? date + 1 : date - 1
    if(date < 0 && currentMonth === 0){
        currentMonth = 11
        currentYear--
        date = daysInMonth()
    } else if(date > daysInMonth() && currentMonth === 11){
        currentMonth = 0
        currentYear++
        date = 1
    } else if(date < 0) {
        currentMonth--
        date = daysInMonth()
    } else if(date > daysInMonth()){
        currentMonth++
        date = 1
    }
    console.log("after increment: " + date + " " + currentMonth + " " + currentYear)
    return date
}

function showWeekCalendar(positive){
    $('#week-by-week').empty()
    $('#week-by-week').append("<tr>")

    // Check if 'prev' or 'next' has been clicked
    let first = today.getDate() - today.getDay()
    while(first < 0) {
        first = incrementCheck(first, true)
    }

    if(first < 0){
        first = daysInMonth() + first
        if(currentMonth === 0){
            currentMonth = 11
            currentYear--
            changeHeader(currentMonth, currentYear)
        } else {
            currentMonth--
            changeHeader(currentMonth, currentYear)
        }
    }

    // Check if 'prev' or 'next' has been clicked
    if(week[0] !== 0){
        first = (positive) ? week[6] : week[0]
        // true - first = week[6] + 1
        // false - first = week[0] - 1
        if(positive){
            first = incrementCheck(first, true)
        } else {
            for(let i = 0; i < 6; i++){
                first = incrementCheck(first, false)
                console.log("first day loop - 7: " + first)
            }
        }
    }
    console.log("first day: " + first + " " + currentMonth + " " + currentYear)

    // Set days for the week
    for(let i = 0; i < 7; i++){
        week[i] = first
        printWeek(first)
        first = incrementCheck(first, true)
    }

    // Update header
    if(Math.abs(week[0] - week[6]) > 7){
        if(positive){
            addToHeader((currentMonth === 0) ? 11 : currentMonth - 1, (currentMonth === 0) ? currentYear - 1 : currentYear)
        } else {
            changeHeader((currentMonth === 0) ? 11 : currentMonth - 1, (currentMonth === 0) ? currentYear - 1 : currentYear)
            addToHeader(currentMonth, currentYear)
        }
    } else {
        changeHeader(currentMonth, currentYear)
    }
    console.log(week)
    $('#week-by-week').append("</tr>")
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear)

    let firstDay = (new Date(currentYear, currentMonth)).getDay()
    let monthDays = daysInMonth()

    let table = $('#month-by-month')

    let date = 1 // Change to Date so you can compare dates for active (easier)
    for (let i = 0; i < 6; i++) {
        table.append("<tr>")
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                table.append("<td></td>")
            }
            else if (date > monthDays) {
                break
            }
            else {
                if (date === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    table.append("<td class=\"active\">" + date + "</td>")
                } else {
                    table.append("<td>" + date + "</td>")
                }
                date++
            }
        }
        table.append("</tr>")
    }

}