$('#piano .be-only').addClass('disabled');

$('.note-key').click(function() {
    let v = $(this).data('note');
    $('#pitch').val(v);
    $('#pitch-test').text(Number(Math.pow(2, (v-12)/12).toFixed(6)));
});

$('#version').change(function() {
    $('#note-type>option').removeAttr('disabled');
    $('#piano .note-key').removeClass('disabled');
    switch ($('#version').val()) {
        case 'je114':
            $('#piano .be-only').addClass('disabled');
            break;

        case 'je112':
        case 'je113':
            $('#piano .be-only').addClass('disabled');
            $('#note-type>.on-je114').attr('disabled', 'disabled');
            break;

        case 'je19' :
        case 'je161':
            $('#piano .be-only').addClass('disabled');
            $('#note-type>.on-je114, #note-type>.on-je112').attr('disabled', 'disabled');
            break;

        case 'be1130':
            $('#note-type>option').removeAttr('disabled');
            break;
    
        default:
            $('#note-type>option').removeAttr('disabled');
            break;
    }
});

$('#note-type').change(function() {
    $('#noteblock-icon-background img').addClass('hide');
    $('#noteblock-info p').addClass('hide');
    $('#noteblock-icon-background .'+$('#note-type').val()).removeClass('hide');
    $('#noteblock-info .'+$('#note-type').val()).removeClass('hide');
});

$('#pitch').change(function() {
    let v = $('#pitch').val();
    $('#pitch-test').text(Number(Math.pow(2, (v-12)/12).toFixed(6)));
});

$('#piano-pos-reset').click(function() {
    pianoPosReset();
});

$('#frm-ntb').on("submit", function(event){
    event.preventDefault();
    exportCmd();
});

function exportCmd() {
    let pitch = $('#pitch').val();
    if (!Verif.mathNum(pitch)) {
        errorOut("格式错误：音高必须是数字。");
        return false;
    }

    pitch = Number(Math.pow(2, (pitch-12)/12).toFixed(6));

    if ((pitch > 2 || pitch < 0.5) && $('#version').val() != "be1130") {
        return errorOut("数据错误：Java 版只能接受 0.5 ~ 2 之间的音调。");
    }

    let txtCmd = ";"

    switch ($('#version').val()) {
        case 'be1130':
            txtCmd = "/playsound note." + $('#note-type').val() + " @a ~ ~ ~ 1 " + pitch;
            break;

        case 'je161':
            
            txtCmd = "/playsound minecraft:block.note." + $('#note-type').val() + " @a ~ ~ ~ 1 " + pitch;
            break;

        case 'je19':
        case 'je112':
            txtCmd = "/playsound minecraft:block.note." + $('#note-type').val() + " block @a ~ ~ ~ 1 " + pitch;
            break;

        case 'je113':
        case 'je114':
            txtCmd = "/playsound minecraft:block.note_block." + $('#note-type').val() + " block @a ~ ~ ~ 1 " + pitch;
            break;
    
        default:
            break;
    }

    $('#output').val(txtCmd);
    $('#output').focus();
    $('#output').select();
    return txtCmd;
}