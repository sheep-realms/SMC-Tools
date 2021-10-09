if (localStorage.getItem("username") == null) {
    localStorage.setItem("username", "Steve");
    localStorage.setItem("notepad", "");
    localStorage.setItem("notepadDate", 0);
}

$('.landing-focus').focus();

let notepadLastDate = localStorage.getItem("notepadDate");
let notepadAutoSave = false;
$('#notepad-text').val(localStorage.getItem("notepad"));

$('#nav').click(function() {
    menuSwitch();
});

$('#msgbox .close').click(function() {
    msgClose();
});



$('#notepad-text').blur(function() {
    if (notepadAutoSave) {
        if (localStorage.getItem("notepadDate") == notepadLastDate) {
            if (localStorage.getItem("notepad") != $('#notepad-text').val()) {
                localStorage.setItem("notepad", $('#notepad-text').val());
                notepadLastDate = Date.now()
                localStorage.setItem("notepadDate", notepadLastDate);
            }
        } else {
            notepadAutoSave = false;
            warnOut("注意：便笺内容已在其他网页上被更改，此次编辑未被保存。重新打开便笺以刷新。");
        }
    }
});

let pianoMode = false;

$(document).keydown(function(e) {
    if (!pianoMode) {
        if (e.ctrlKey) {
            switch (e.keyCode) {
                case 66:
                    e.preventDefault();
                    if ($('#menu').hasClass('hide')) {
                        if ($('.landing-focus').length != 0) {
                            $('.landing-focus').focus();
                        } else {
                            $('#menu-buttom-focus').focus();
                        }
                    } else {
                        $('#menu-top-focus').focus();
                    }
                    return false;
                case 72:
                    if (e.shiftKey) {
                        e.preventDefault();
                        window.open("../../misc/help/index.html", "_blank");
                        return false;
                    } else {
                        return true;
                    }
                case 75:
                    if (e.shiftKey) {
                        e.preventDefault();
                        if (!pianoMode && $('#piano').length != 0) {
                            pianoMode = true;
                            notepadSwitch(true);
                            $('#piano').addClass('keyinput');
                            msgOut("已开启钢琴键入模式。再次按下快捷键关闭钢琴键入模式。");
                        }
                        return false;
                    } else {
                        return true;
                    }
                case 77:
                    e.preventDefault();
                    menuSwitch();
                    return false;
                case 79:
                    e.preventDefault();
                    $('#output').focus();
                    $('#output').select();
                    return false;
                case 80:
                    e.preventDefault();
                    notepadSwitch();
                    return false;
                case 222:
                    e.preventDefault();
                    msgClose();
                    return false;
            
                default:
                    break;
            }
        }
    } else {
        if (e.keyCode == 75 && e.shiftKey && e.ctrlKey) {
            e.preventDefault();
            pianoMode = false;
            $('#piano').removeClass('keyinput');
            msgClose();
            return false;
        }
        if (pianoKeyList[e.keyCode] != undefined) {
            $('#piano .note-'+pianoKeyList[e.keyCode]).click();
            $('#piano .note-'+pianoKeyList[e.keyCode]).addClass('active');
        }
    }
});

$(document).keyup(function(e) {
    if (pianoMode) {
        $('#piano .active').removeClass('active');
    }
});

let pianoKeyList = {
    65: 0,
    90: 1,
    83: 2,
    88: 3,
    68: 4,
    67: 5,
    86: 6,
    71: 7,
    66: 8,
    72: 9,
    78: 10,
    77: 11,
    75: 12,
    188: 13,
    76: 14,
    190: 15,
    186: 16,
    191: 17,
    81: 13,
    50: 14,
    87: 15,
    51: 16,
    69: 17,
    82: 18,
    53: 19,
    84: 20,
    54: 21,
    89: 22,
    85: 23,
    56: 24
}

function menuSwitch() {
    if ($('#menu').hasClass('hide')) {
        $('#menu').removeClass('hide');
        $('#nav').addClass('open');
        $('#menu-top-focus').focus();
    } else {
        $('#menu').addClass('hide');
        $('#nav').removeClass('open');
        if ($('.landing-focus').length != 0) {
            $('.landing-focus').focus();
        } else {
            $('#menu-buttom-focus').focus();
        }
    }
}

function notepadSwitch(isClose=false) {
    if ($('#notepad').hasClass('hide') && !isClose) {
        $('#notepad').removeClass('hide');
        $('#notepad-text').removeAttr("disabled");
        $('#notepad-text').val(localStorage.getItem("notepad"));
        notepadAutoSave = true;
        notepadLastDate = localStorage.getItem("notepadDate");
        $('#notepad-text').focus();
    } else {
        $('#notepad').addClass('hide');
        $('#notepad-text').attr("disabled", "");
    }
}

function msgOut(message, type="") {
    $('#msgbox .content').text(message);
    $('#msgbox').removeClass('error warn safe hide');
    $('#msgbox').addClass(type);
}

function errorOut(message) {
    msgOut(message, "error");
}

function warnOut(message) {
    msgOut(message, "warn");
}

function safeOut(message) {
    msgOut(message, "safe");
}

function msgClose() {
    $('#msgbox').addClass('hide');
}

function b2n(boolean) {
    if (boolean) {
        return 1;
    } else {
        return 0;
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function loadShareLink() {
    $('#menu .fh-article').append('<h2>分享</h2><p>当前网页地址：</p><p><code id="weburl"></code></p><p>若是在线网站，您可以复制这串网址分享给他人，这将会自动展现生成结果。</p>');
}

function formatJson(json, options) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ': ');
    }
    (json.split('\r\n')).forEach(function (node, index) {
        var i = 0,
                indent = 0,
                padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    }
    );
    return formatted.replace(/^\s+|\s+$/g,'');
};