let packMcmeta = {
    description: "",
    pack_format: 0
}

let llc = 0;

$('#pack-format-mode').click(function() {
    if ($('#pack-format-sel').hasClass('hide')) {
        $('#pack-format-sel').removeClass('hide');
        $('#pack-format').addClass('hide');
        $('#pack-format-sel').val($('#pack-format').val());
    } else {
        $('#pack-format-sel').addClass('hide');
        $('#pack-format').removeClass('hide');
        $('#pack-format').val($('#pack-format-sel').val());
    }
});

$('#frm-pkm').on("submit", function(event){
    event.preventDefault();
    let packFormat;
    if (!$('#pack-format').hasClass('hide')) {
        packFormat = $('#pack-format').val()
    } else {
        packFormat = $('#pack-format-sel').val()
    }

    if (!Verif.onlyNum(packFormat)) {
        errorOut("格式错误：资源包版本是无符号数字编号。");
        return false;
    }
    if (packFormat == 0) {
        errorOut("数据错误：资源包版本必须大于0。");
        return false;
    }

    let langlist = {};
    let doLang = false;

    $('#lang-list>li').map(function() {
        if ($(this).find('.lang-code').val() != "") {
            let lan = $(this).find('.lang-code').val();
            let lanN = $(this).find('.lang-name').val();
            let lanR = $(this).find('.lang-region').val();
            let lanB = Boolean(Number($(this).find('.lang-bidirectional').val()));
            langlist[lan] = {
                name: lanN,
                region: lanR,
                bidirectional: lanB
            };
            doLang = true;
        }
    });

    if (doLang) {
        packMcmeta = {
            pack: {
                description: $('#description').val(),
                pack_format: packFormat,
            },
            language: langlist
        }
    } else {
        packMcmeta = {
            pack: {
                description: $('#description').val(),
                pack_format: packFormat,
            }
        }
    }
    

    $('#output').text(formatJson(packMcmeta));
    $('#output').focus();
    $('#output').select();
    msgClose();
    // $('#weburl').text(window.location.pathname + "?value=" + $('#value').val());
});

$('.language-add').click(function() {
    $('#lang-list').append($('#tamplate-lang').clone().attr("id", "lang-"+llc));
    $('.lang-code').change(function() {
        langAutoComplate($(this));
    });
    $('.lang-name, .lang-region').change(function() {
        $(this).parents('li.lang').removeClass('auto');
    });
    $('#language-more-add').removeClass('hide');
    $("#lang-"+llc).find('.lang-code').focus();
    llc++;
});

$('#help-description').click(function() {
    msgOut("description 是资源包的描述文本。该文本将会显示为2行。如果文本太长则会被截断。该值可以是纯文本字符串，也可以是原始JSON文本。");
});

$('#help-pack-format').click(function() {
    msgOut("pack_format 资源包版本。如果这个数值与当前需要的数值不匹配，则资源包就会显示一个错误，进行附加确认后才能加载资源包。更多详细信息请阅读 Minecraft Wiki。");
});

$('#help-language').click(function() {
    msgOut("language 包含了要向语言菜单里添加的附加语言。该值是复合数据，每一项数据用语言代码命名。在 Minecraft 中，语言代码必须全部小写且使用下划线。");
});

function removeLang(id) {
    $('#'+id).remove();
}

function langAutoComplate($that) {
    $that.val($that.val().toLowerCase().replace("-", "_"));
    $langitem = $that.parents('li.lang');
    if ($langitem.hasClass('auto')) {
        let m = languageList.find(function(a) {return a.code == $that.val()});
        if (m) {
            $langitem.find('.lang-name').val(m.name);
            $langitem.find('.lang-region').val(m.region);
            if ("bidirectional" in m) {
                $langitem.find('.lang-bidirectional').val(b2n(m.bidirectional));
            } else {
                $langitem.find('.lang-bidirectional').val(0);
            }
        }
    }
}