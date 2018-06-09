$.fn.addMenu = function (menu) {
    var showMenu = new Menu(menu, this);
    showMenu.add();
}

function Menu(list, target) {
    this.list = list;
    this.target = target;
}

Menu.prototype.add = function () {
    var header = this.target;
    for (var i = 0; i < this.list.length; i++) {
        var topMenu = this.makeTopMenu(this.list[i]);//넣을 메뉴
        header.append(topMenu);//header는 menu들을 넣을 대상
    }
};

Menu.prototype.makeTopMenu=function(topMenu){
    var dropdown = $('<li></li>');//
    dropdown.addClass('dropdown');
    var dropbtn = $('<a></a>');//
    dropbtn.addClass('dropbtn');
    var content = $('<div></div>');//subMenu틀
    content.addClass('dropdown-content');
    for(option in topMenu){
        if(option=='name'){
            dropbtn.append(topMenu[option]);
        }else if(option=='subMenu'){
            this.makeSubMenu(content, topMenu[option]);
        }else{
            this.addEventHandler(dropbtn,option,topMenu[option]);
        }
    }
    dropdown.append(dropbtn);
    dropdown.append(content);
    return dropdown;
}

Menu.prototype.makeSubMenu=function(content,subMenus){
    for (var j = 0; j < subMenus.length; j++) {//subMenu들, json 배열로 존재
        var subMenu = $('<a></a>');
        for(option in subMenus[j]){
            if(option=='name'){
                subMenu.append(subMenus[j][option]);
            }else{
                this.addEventHandler(subMenu,option,subMenus[j][option]);
            }
        }
        content.append(subMenu);
    }
}

Menu.prototype.addEventHandler=function(target, event, func){
    target.on(event,func);
}