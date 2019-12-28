$('#by-week').click(() => {
    $('#week-by-week').css("display", "block");
    $('#month-by-month').css("display", "none");
});

$('#by-month').click(() => {
    $('#month-by-month').css("display", "block");
    $('#week-by-week').css("display", "none");
});