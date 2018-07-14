$(function () {
    $.contextMenu({
        selector: '.tree-folder',
        callback: function (key, options) {
            if (key == "add") {
                var name = prompt("생성할 파일의 이름");
                if (!(name == null || name == "")) {
                    tree.addFile([{
                        "file_ident": 24,
                        "dir_ident": $(this).attr("dir_ident"),
                        "file_name": name,
                        "file_content": null,
                        "project_ident": 8
                    }]);
                }
            } else if (key == "addDir") {
                var name = prompt("생성할 디렉터리 이름");
                if (!(name == null || name == "")) {
                    tree.addDir([{
                        "dir_ident": 5,
                        "dir_name": name,
                        "dir_parent": $(this).attr("dir_ident"),
                        "project_ident": 4
                    }]);
                }
            } else if(key == "rename"){
                var name = prompt("바꿀 이름");
                if(!(name == null && name == "")){
                    $(this).children('.tree-title').html(name);
                }
            } else if (key == "delete"){
                $(this).remove();
            }
        },
        items: {
            "add": { name: "Add", icon: "add" },
            "addDir": { name: "AddDir", icon: "add" },
            "rename": { name: "rename", icon: "edit" },
            "delete": { name: "Delete", icon: "delete" }
        }
    });

    $.contextMenu({
        selector: '.tree-file',
        callback: function (key, options) {
            if(key == 'rename'){
                var name = prompt('바꿀 이름');
                if(!(name==null && name=="")){
                    $(this).children('.tree-title').html(name);
                }
            } else if(key == 'delete'){
                $(this).remove();
            }
        },
        items: {
            "rename": {name: "rename", icon:"edit"},
            "delete": { name: "Delete", icon: "delete" }
        }
    });
    

    $.contextMenu({
        selector: '.nav',
        callback: function (key, options) {
            if(key == 'create Project'){
                tree._addProject();
            } 
        },
        items: {
            "create Project": {name: "create Project", icon:"product-hunt"},
        }
    });

});