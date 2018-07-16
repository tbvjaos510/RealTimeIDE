$(function () {
    $.contextMenu({
        selector: '[project_ident]',
        callback: function (key, options) {
            if (key == "add") {
                var name = prompt("생성할 파일의 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "file/create",
                        data: {
                            pident: $(this).attr("project_ident"),
                            name: name
                        },
                        method: "POST",
                        success: function(result){
                            if(result.success)
                                tree.addFile(result.file);
                            alert(result.message);
                        }
                    });
                }
            } else if (key == "addDir") {
                var name = prompt("생성할 디렉터리 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "directory/create",
                        data: {
                            dirName: name,
                            ident: $(this).attr("project_ident")
                        },
                        method: "POST",
                        success: function(result){
                            if(result.success)
                                tree.addDir(result.data);
                            alert(result.message);
                        }
                    });
                }
            } else if(key == "rename"){
                var name = prompt("바꿀 프로젝트 이름");
                var desc = prompt("바꿀 프로젝트 설명(미입력시 원래 설명이 유지됩니다.)");

                var this1=this;
                if(!(name == null && name == "")){
                    console.log($.ajax({
                        url: "project/update",
                        data: (function(){
                            console.log({ident: $(this1).attr("project_ident"),name: name});
                            if(desc==""||desc==null)
                                return {ident: $(this1).attr("project_ident"),name: name};
                            return {ident: $(this1).attr("project_ident"),name: name, desc: desc};
                        })(),
                        method: "POST",
                        success: function(result){
                            if(result.success){
                                $(this1).children('.tree-title').html(name);
                            }
                            alert(result.message);
                        }
                    }));
                }
                var projects = $.ajax({
                    url: "project/get",
                    method: "POST",
                    async: false
                }).responseJSON.data;
                //채팅창 뿌리기
                $(".chat-list>ul>li").remove();
                for(var i = 0; i < projects.length; i++){
                    var project = projects[i];
                    var li = $("<li />");
                    li.html(project.project_name);
                    $(".chat-list>ul").append(li);
                    console.log("test");
                }
            } else if (key == "delete"){
                $.ajax({
                    url: "project/delete",
                    method: "POST",
                    data: {ident: $(this).attr("project_ident")},
                    success: function(result){
                        if(result.success){
                            alert(result.message);
                        }
                    }
                });
                $(this).remove();
                var projects = $.ajax({
                    url: "project/get",
                    method: "POST",
                    async: false
                }).responseJSON.data;
                //채팅창 뿌리기
                $(".chat-list>ul>li").remove();
                for(var i = 0; i < projects.length; i++){
                    var project = projects[i];
                    var li = $("<li />");
                    li.html(project.project_name);
                    $(".chat-list>ul").append(li);
                    console.log("test");
                }
            }else if(key=="invite"){

            }
        },
        items: {
            "add": { name: "AddFile", icon: "add" },
            "addDir": { name: "AddDir", icon: "add" },
            "rename": { name: "rename", icon: "edit" },
            "delete": { name: "Delete", icon: "delete" },
            "sep1": "-",
            "invite": {name: "Invite Other", icon: "add"},
            "desc": { name: "info"}
        }
    });
    $.contextMenu({
        selector: '[dir_ident]',
        callback: function (key, options) {
            if (key == "add") {
                var name = prompt("생성할 파일의 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "file/create",
                        data: {
                            pident: $(this).attr("parent_project"),
                            ident: $(this).attr("dir_ident"),
                            name: name
                        },
                        method: "POST",
                        success: function(result){
                            if(result.success)
                                tree.addFile(result.file);
                            alert(result.message);
                        }
                    });
                }
            } else if (key == "addDir") {
                var name = prompt("생성할 디렉터리 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "directory/create",
                        data: {
                            dirName: name,
                            ident: $(this).attr("parent_project"),
                            dirident: $(this).attr("dir_ident")
                        },
                        method: "POST",
                        success: function(result){
                            if(result.success)
                                tree.addDir(result.data);
                            alert(result.message);
                        }
                    });
                }
            } else if(key == "rename"){
                var name = prompt("바꿀 이름");
                var this1 = this;
                if(!(name == null && name == "")){
                    $.ajax({
                        url:"directory/update",
                        method: "POST",
                        data: {ident: $(this1).attr("dir_ident"),dirName: name},
                        success: function(result){
                            if(result.success){
                                $(this1).children('.tree-title').html(name);
                            }
                            alert(result.message);
                        }
                    }
                    );
                }
            } else if (key == "delete"){
                $.ajax({
                    url: "directory/delete",
                    method: "POST",
                    data: {ident: $(this).attr("dir_ident")},
                    success: function(result){
                        if(result.success){
                            $(this).remove();
                        }
                        alert(result.message);
                    }
                });
            }
        },
        items: {
            "add": { name: "AddFile", icon: "add" },
            "addDir": { name: "AddDir", icon: "add" },
            "rename": { name: "rename", icon: "edit" },
            "delete": { name: "Delete", icon: "delete" }
        }
    });

    $.contextMenu({
        selector: '[file_ident]',
        callback: function (key, options) {
            if(key == 'rename'){
                var name = prompt('바꿀 이름');
                var this1 = this;
                if(!(name==null && name=="")){
                    $.ajax({
                        url:"file/updateFileName",
                        method: "POST",
                        data: {ident: $(this1).attr("file_ident"),fileName: name},
                        success: function(result){
                            if(result.success){
                                $(this1).children('.tree-title').html(name);
                            }
                            alert(result.message);
                        }
                    }
                    );
                }
            } else if(key == 'delete'){
                $.ajax({
                    url: "file/delete",
                    method: "POST",
                    data: {ident: $(this).attr("file_ident")},
                    success: function(result){
                        if(result.success){
                            $(this).remove();
                        }
                        alert(result.message);
                    }
                });
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