// For global variables
const today = new Date();
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate() - 1;
let week = [0, 0, 0, 0, 0, 0, 0];
showMonthCalendar();

// Handles click event for changing displays
$('#by-week').click(() => {
    showWeekCalendar(true);
});

$('#by-month').click(() => {
    showMonthCalendar();
});

function clear() {
    $('#week-by-week').empty();
    $('#month-by-month').empty();
    $('#month').empty();
}

function next() {
    clear();

    // Checks whether in weekly or monthly mode
    if($('input[name=\'selector\']:checked').val() === "week"){
        showWeekCalendar(true);
    } else {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        showMonthCalendar();
    }
}

function previous() {
    clear();

    // Checks whether in weekly or monthly mode
    if($('input[name=\'selector\']:checked').val() === "week"){
        showWeekCalendar(false);
    } else {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showMonthCalendar();
    }
}

function changeHeader(month, year){
    $('#month').empty();
    $('#month').append(months[month] + "<br/><span>" + year + "</span>");
}

function addToHeader(monthToAdd, yearToAdd){
    $('#month').append("/" + months[monthToAdd] + "<br/><span>" + yearToAdd + "</span>");
}

function printWeek(date){
    if(today.getDate() === date & today.getMonth() === currentMonth && today.getFullYear() === currentYear){
        $('#week-by-week').append("<td class=\"active\">" + date + "</td>");        
    } else {
        $('#week-by-week').append("<td>" + date + "</td>");        
    }
}

// positive: true - 'next' was clicked or 'by-week' was clicked
//          false - 'prev' was clicked
function showWeekCalendar(positive){
    $('#week-by-week').append("<tr>");
    changeHeader(currentMonth, currentYear);
    let monthDays = new Date(currentYear, currentMonth, 0).getDate();
    let recentlyHalf = false;
    if(positive){
        // If 'prev' or 'next' hasn't been clicked
        currentDate = (week[0] === 0) ? currentDate : week[6];
        console.log(positive + " " + currentDate);
        for(let i = 1; i <= 7; i++){
            currentDate += 1;
            if(currentDate > monthDays){
                currentDate = 1;
                printWeek(currentDate); // Print before month / year change to check active
                if(currentMonth === 11){
                    addToHeader(0, currentYear + 1);
                    currentMonth = 0;
                    currentYear += 1;
                } else {
                    addToHeader(currentMonth + 1, currentYear);
                    currentMonth += 1;
                }
                recentlyHalf = true;
            } else {
                // Changes date back from two months to one again
                recentlyHalf = false;
                printWeek(currentDate);
            }
            week[i-1] = currentDate;
        }
    } else {
        let monthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
        // If 'prev' or 'next' hasn't been clicked
        currentDate = (week[0] === 0) ? currentDate : week[0] - 7;
        
        // Check for underflow within substraction
        currentDate = (currentDate < 0) ? monthDays + currentDate : currentDate;
        console.log(positive + " " + currentDate);

        for(let i = 7; i >= 1; i--){
            currentDate -= 1;
            if(currentDate < 0){
                currentDate = 1;
                printWeek(currentDate); // Print before month / year change to check active
                if(currentMonth === 0){
                    addToHeader(11, currentYear - 1);
                    currentMonth = 11;
                    currentYear -= 1;
                } else {
                    console.log(currentMonth);
                    addToHeader(currentMonth - 1, currentYear);
                    currentMonth -= 1;
                }
                recentlyHalf = true;
            }
            recentlyHalf = false;
            week[7-i] = currentDate;
        }
        week.reverse().forEach((element) => {
            printWeek(element);
        })
    }
    console.log(week);
    $('#week-by-week').append("</tr>");
}

function showMonthCalendar() {
    changeHeader(currentMonth, currentYear);

    let firstDay = (new Date(currentYear, currentMonth)).getDay();
    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();

    let table = $('#month-by-month');

    let date = 1; // Change to Date so you can compare dates for active (easier)
    for (let i = 0; i < 6; i++) {
        table.append("<tr>");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                table.append("<td></td>");
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                if (date === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    table.append("<td class=\"active\">" + date + "</td>");
                } else {
                    table.append("<td>" + date + "</td>");
                }
                date++;
            }
        }
        table.append("</tr>");
    }

}