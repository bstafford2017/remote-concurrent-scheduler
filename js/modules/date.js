let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    $('#month-by-month').empty();
    $('#month').empty();
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    $('#month-by-month').empty();
    $('#month').empty();
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

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