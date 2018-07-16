
function makeTree(selector) {
    this.selector = selector;
    this.treeCount = 0;
    this.tree = new orangeTree(selector);
}

makeTree.prototype.makeDefault = function () {
        $(this.selector).find(".tree").empty();
        var this1 = this;
        var projects = $.ajax({
            url: "project/get",
            method: "POST",
            async: false
        }).responseJSON.data;

        for(var i = 0; i < projects.length; i++){
            var project = projects[i];
            var li = $("<li />");
            li.html(project.project_name);
            li.attr("project_ident", project.project_ident);
            console.log(li);
            $(".chat-list ul").append(li);
            console.log("test");
        }

    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var directorys;
        var files;
        this.tree.addBranch({
            folder: true,
            title: project.project_name,
            icon: "<i class='fa fa-save'></i>"
        });
        this.treeCount++;
        $("li[data-id=" + this.treeCount + "]").attr("project_ident", project.project_ident);
        this.addEntity(project.project_ident);
    }
   
}


makeTree.prototype.addProject = function (projectData, descData, privateData) {
    var projectData = $("input[name='project']").val();
    var descData = $("input[name='project-desc']").val();
    var privateData = $("input[id='private']")[0].checked;
    if (privateData) privateData = 1;
    else privateData = 0;
    console.log(privateData);
    var this1 = this;
    if (!(projectData == null || projectData == '' || descData == null || descData == '' || privateData == null || privateData == '')) {
        $.ajax({
            url: "project/create",
            data: {
                name: projectData,
                desc: descData,
                private: privateData
            },
            method: "POST",
            success: function (res) {
                if (res.success) {
                    this1.tree.addBranch({
                        folder: true,
                        title: projectData,
                        icon: "<i class='fa fa-save'></i>"
                    });
                    this1.treeCount++;
                    $("li[data-id=" + this1.treeCount + "]").attr("project_ident", res.ident);
                    //프로젝트 목록 불러오기
                    var projects = $.ajax({
                        url: "project/get",
                        method: "POST",
                        async: false
                    }).responseJSON.data;
                    //채팅창 뿌리기
                    $(".chat-list ul li").remove();
                    for(var i = 0; i < projects.length; i++){
                        var project = projects[i];
                        var li = $("<li />");
                        li.html(project.project_name);
                        li.attr("project_ident", project.project_ident);
                        $(".chat-list ul").append(li);
                        console.log("test");
                    }
                }
                alert(res.message);
            }
        });

    }
    
};

makeTree.prototype.searchProject = function(projectData){
    var projectData = $("input[name='search']").val();
    $.ajax({
        url: "project/search",
        data : {keyword : projectData},
        method: "POST",
        async: true,
        success : function(data){
            if (data.success === false){
                alert(data.message);
            } else if(data.success === true){
                var rooms = data.data;
                projectListPopup(rooms);
            }
        }
    });
}



makeTree.prototype.addDir = function (dirData) {
    for (var i = 0; i < dirData.length; i++) {
        var dir = dirData[i];
        var this1;
        if (!dir.dir_parent) { //부모가 null, 최상위 파일
            this.tree.addBranch({
                folder: true,
                title: dir.dir_name,
                path: $("li[project_ident=" + dir.project_ident + "]").attr("data-id")
            });
        } else {
            this.tree.addBranch({
                folder: true,
                title: dir.dir_name,
                path: $("li[dir_ident=" + dir.dir_parent + "]").attr("data-id") //부모 폴더의 path를 설정
            });
        }
        this.treeCount++;
        this1 = $("li[data-id=" + this.treeCount + "]");
        this1.attr("dir_ident", dir.dir_ident);
        this1.attr("parent_project", dir.project_ident);
    }
};


makeTree.prototype.addFile = function (fileData) {
    for (var i = 0; i < fileData.length; i++) {
        var file = fileData[i];
        if (!file.dir_ident) {
            this.tree.addBranch({
                title: file.file_name,
                path: $("li[project_ident=" + file.project_ident + "]").attr("data-id"),
                click: changeFile
            });
        } else {
            this.tree.addBranch({
                title: file.file_name,
                path: $("li[dir_ident=" + file.dir_ident + "]").attr("data-id"),
                click: changeFile
            });
        }
        this.treeCount++;
        $("li[data-id=" + this.treeCount + "]").attr("file_ident", file.file_ident);
    }

};

makeTree.prototype.delete = function () {

    for (var i = 0; i < fileData.length; i++) {
        var file = fileData[i];
        if (file.dir_ident == 0) {

        }
    }
};

makeTree.prototype.addEntity = function (project_ident) {
    var this1 = this;
    $.ajax({
        url: "directory/get",
        data: {
            ident: project_ident
        },
        method: "POST",
        success: function (result) {
            this1.addDir(result);
        }
    }).then(function () {
        $.ajax({
            url: "file/get",
            data: {
                ident: project_ident
            },
            method: "POST",
            success: function (result) {
                this1.addFile(result.data);
            }
        });
    });
}

