$('#recur').change(() => {
    $('#recur').is(':checked') ? $('#recur-end').removeAttr('disabled') : $('#recur-end').attr('disabled', 'disabled')
})