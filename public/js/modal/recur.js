$('#recur').change(() => {
    if($('#recur').is(':checked')){
        $('#recur-end').removeAttr('disabled')
        $('#sunday').removeAttr('disabled')
        $('#monday').removeAttr('disabled')
        $('#tuesday').removeAttr('disabled')
        $('#wednesday').removeAttr('disabled')
        $('#thursday').removeAttr('disabled')
        $('#friday').removeAttr('disabled')
        $('#saturday').removeAttr('disabled')
    } else {
        $('#recur-end').attr('disabled', 'disabled')
        $('#sunday').attr('disabled', 'disabled')
        $('#monday').attr('disabled', 'disabled')
        $('#tuesday').attr('disabled', 'disabled')
        $('#wednesday').attr('disabled', 'disabled')
        $('#thursday').attr('disabled', 'disabled')
        $('#friday').attr('disabled', 'disabled')
        $('#saturday').attr('disabled', 'disabled')
    }

})