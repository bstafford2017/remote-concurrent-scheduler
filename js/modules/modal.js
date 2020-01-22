let active = $('nav-tabs > li > active')
$('.nav-tabs > li > a').click((event) => {
    console.log(event.target.id)
    active.removeClass('active')
    $('#' + event.target.id).addClass('active')
    $('.modal-body').empty()
}) 
