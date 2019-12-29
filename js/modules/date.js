// For global variables
const today = new Date();
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let weekCounter = 0;
let recentDate = 0;
onload();

$('#by-week').click(() => {
    getWeek();
});

$('#by-month').click(() => {
    showCalendar(currentMonth, currentYear);
});

function onload() {
    if($('input[name=\'selector\']:checked').val() === "week"){
        getWeek();
        console.log("test");
    } else {
        showCalendar(currentMonth, currentYear);
    }
}

function clear(){
    $('#week-by-week').empty();
    $('#month-by-month').empty();
    $('#month').empty();
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    clear();
    if($('input[name=\'selector\']:checked').val() === "week"){
        getWeek();
        weekCounter += 7;
    } else {
        showCalendar(currentMonth, currentYear);
    }
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    clear();
    if($('input[name=\'selector\']:checked').val() === "week"){
        getWeek();
        weekCounter -= 7;
    } else {
        showCalendar(currentMonth, currentYear);
    }
}

function getWeek(){
    $('#month').empty();
    $('#month').append(months[new Date().getMonth()] + "<br/><span>" + new Date().getFullYear() + "</span>");
    $('#week-by-week').append("<tr>");   
    let curr = new Date();     
    for (let i = 1; i <= 7; i++) {
        let day;
        if(weekCounter === 0){
            let first = curr.getDate() - curr.getDay() + i - 1;
            day = new Date(curr.setDate(first)).getDate();
        } else {
            day = recentDate + i - 1;
        }
        if(new Date().getDate() === day){
            $('#week-by-week').append("<td class=\"active\">" + day + "</td>");        
        } else {
            $('#week-by-week').append("<td>" + day + "</td>");        
        }
        if(i === 7){
            recentDate = day;
        }
    }
    $('#week-by-week').append("</tr>");
}

function showCalendar(month, year) {
    clear();
    $('#month').append(months[currentMonth] + "<br/><span class=\"active\" style=\"font-size: 18px\"></span>" + currentYear);

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let table = $('#month-by-month');

    let date = 1;
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
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
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