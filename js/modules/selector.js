$('#by-week').click(() => {
    $('#week-by-week').css("display", "");
    $('#month-by-month').css("display", "none");
});

$('#by-month').click(() => {
    $('#month-by-month').css("display", "");
    $('#week-by-week').css("display", "none");
});