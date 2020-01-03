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
    showWeekCalendar()
})

$('#by-month').click(() => {
    showMonthCalendar()
})

function clear() {
    $('#week-by-week').empty()
    $('#month-by-month').empty()
    $('#month').empty()
}

function next() {
    clear()

    // Checks whether in weekly or monthly mode
    if($('input[name=\'selector\']:checked').val() === "week"){
        showWeekCalendar()
    } else {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear
        currentMonth = (currentMonth + 1) % 12
        showMonthCalendar()
    }
}

function previous() {
    clear()

    // Checks whether in weekly or monthly mode
    if($('input[name=\'selector\']:checked').val() === "week"){
        showWeekCalendar()
    } else {
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
    date = (increment) ? date + 1 : date - 1
    if(date < 0 && currentMonth === 0){
        changeHeader(currentMonth, currentYear);
        currentMonth = 11
        currentYear--
        date = (32 - new Date(currentYear, currentMonth,32).getDate())
        addToHeader(currentMonth, currentYear);
    } else if(date > 32 - new Date(currentYear, currentMonth,32).getDate() && currentMonth === 11){
        changeHeader(currentMonth, currentYear);
        currentMonth = 0
        currentYear++
        date = 1
        addToHeader(currentMonth, currentYear);
    } else if(date < 0) {
        changeHeader(currentMonth, currentYear);
        currentMonth--
        date = (32 - new Date(currentYear, currentMonth,32).getDate())
        addToHeader(currentMonth, currentYear);
    } else if(date > 32 - new Date(currentYear, currentMonth,32).getDate()){
        changeHeader(currentMonth, currentYear);
        currentMonth++
        addToHeader(currentMonth, currentYear);
    }
    return date
}

function showWeekCalendar(){
    $('#week-by-week').append("<tr>")

    // Check if 'prev' or 'next' has been clicked
    let first = (week[0] === 0) ? today.getDate() - today.getDay() : week[0] - 7

    // If the week needs to wrap around to the previous month
    if(first < 0 && currentMonth === 0){
        changeHeader(currentMonth, currentYear)
        currentMonth = 11
        currentYear--
        first = (32 - new Date(currentYear, currentMonth,32).getDate()) + first
        addToHeader(currentMonth, currentYear)
    } else if(first < 0){
        changeHeader(currentMonth, currentYear)
        currentMonth--
        first = (32 - new Date(currentYear, currentMonth,32).getDate()) + first
        addToHeader(currentMonth, currentYear)
    } else {
        changeHeader(currentMonth, currentYear);
        console.log(currentMonth + " " + currentYear)
    }

    for(let i = 0; i < 7; i++){
        week[i] = first;
        printWeek(first)
        first = incrementCheck(first, true)
    }
    $('#week-by-week').append("</tr>")
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear)

    let firstDay = (new Date(currentYear, currentMonth)).getDay()
    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate()

    let table = $('#month-by-month')

    let date = 1 // Change to Date so you can compare dates for active (easier)
    for (let i = 0; i < 6; i++) {
        table.append("<tr>")
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                table.append("<td></td>")
            }
            else if (date > daysInMonth) {
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