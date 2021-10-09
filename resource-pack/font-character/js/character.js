/**
 * 输出字符表
 **/
function unicodeList(a) {
    let b = "";     //字符流
    
    for (i = a * 0x100; i <= a * 0x100 + 0xFF; i++) {   //算出头尾，开始循环
        b += String.fromCharCode(i);                    //输出字符
        if ((i + 1) % 0x10 == 0) b += '\r\n';           //计算是否需要换行
    }

    return b.replace(/^\s+|\s+$/g,'');
}

// 核心代码到此结束

$('#frm-chr').on("submit", function(event){
    event.preventDefault();
    if (!Verif.HEX($('#value').val())) {
        errorOut("格式错误：必须是十六进制字符。");
        return false;
    }
    $('#output').text(unicodeList('0x' + $('#value').val()));
    $('#output').focus();
    $('#output').select();
    msgClose();
    $('#weburl').text(window.location.pathname + "?value=" + $('#value').val());
});

$('#value').focus(function() {
    $(this).select();
});