// For global variables
let today = new Date();
let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
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
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    clear();
    showCalendar(currentMonth, currentYear);
}

function getWeek(){
    let curr = new Date();
    $('#week-by-week').append("<tr>");        
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i - 1;
        let day = new Date(curr.setDate(first));
        console.log(first + " " + day + " " + curr.getDate());
        if(new Date().getDate() === day.getDate()){
            $('#week-by-week').append("<td class=\"active\">" + day.getDate() + "</td>");        
        } else {
            $('#week-by-week').append("<td>" + day.getDate() + "</td>");        
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