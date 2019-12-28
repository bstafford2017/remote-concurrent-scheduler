$('#by-week').onclick(() => {
    $('#week-by-week').css("display", "block");
    $('#month-by-month').css("display", "none");
});

$('#by-month').onclick(() => {
    $('#month-by-month').css("display", "block");
    $('#week-by-week').css("display", "none");
});