let Menu = {
    item: [
        {
            name: "资源包工具",
            id: "resource-pack",
            list: [
                {
                    name: "pack.mcmeta",
                    id: "pack-mcmeta",
                    page: "index.html"
                }, {
                    name: "字体文本提取",
                    id: "font-character",
                    page: "index.html"
                }
            ]
        }, {
            name: "音乐创作工具",
            id: "music",
            list: [
                {
                    name: "音符盒音效命令",
                    id: "noteblock",
                    page: "index.html"
                }
            ]
        }, {
            name: "杂项",
            id: "misc",
            list: [
                {
                    name: "使用指南",
                    id: "help",
                    page: "index.html"
                }, {
                    name: "关于",
                    id: "about",
                    page: "index.html"
                }
            ]
        }
    ]
}

function loadMenu(baseUrl) {
    $('#menu').html('<div class="page"><a href="#" id="menu-top-focus" class="wcag-focus-landing">text</a><div class="fh-article"></div></div>');
    $obj = $('#menu .fh-article');
    Menu.item.forEach(e1 => {
        $obj.append('<h2 id="'+e1.id+'">'+e1.name+'</h2><div id="'+e1.id+'" class="taglist"></div>');
        $obj2 = $('#menu #'+e1.id+".taglist");
        e1.list.forEach(e2 => {
            $obj2.append('<a class="'+setMenuClass(e2, "disable")+'" href="'+baseUrl+e1.id+'/'+e2.id+'/'+e2.page+'">'+e2.name+'</a>');
        });
    });
    $('#menu .page').append('<a href="#" id="menu-buttom-focus" class="wcag-focus-landing">text</a>');
}

function setMenuClass(obj, name, className=name) {
    if (name in obj) {
        if (obj[name]) {
            return className;
        } else {
            return " ";
        }
    } else {
        return " ";
    }
}