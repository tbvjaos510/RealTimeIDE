function makeTree(selector) {
    this.selector = selector;
    this.treeCount = 0;
    this.tree = new orangeTree(selector);
}


makeTree.prototype.addProject = function (projectData, descData) {
    var projectData = $("input[name='project']").val();
    var descData = $("input[name='project-desc']").val();
    if(!(projectData==null || projectData=='' || descData==null || descData=='')){
        console.log(projectData);
        this.tree.addBranch({
            folder:true,
            title: projectData
        });
        
    }
    $.ajax({
        url:"project/create",
        data:{name : projectData, desc : descData},
        method: "POST",
        success: function (res) {
            console.log(res);
            console.log(this.data);
            alert(res.message);
        }
    });
};


makeTree.prototype.addDir = function (dirData) {
    console.log(dirData);
    for (var i = 0; i < dirData.length; i++) {
        var dir = dirData[i];
        console.log(dir.dir_parent);
        if (!dir.dir_parent) {//부모가 null, 최상위 파일
            this.tree.addBranch({
                folder: true,
                title: dir.dir_name
            });
        } else{
            this.tree.addBranch({
                folder: true,
                title: dir.dir_name,
                path: $("li[dir_ident=" + dir.dir_parent + "]").attr("data-id")//부모 폴더의 path를 설정
            });
        }
        this.treeCount++;
        $("li[data-id=" + this.treeCount + "]").attr("dir_ident", dir.dir_ident);
    }
};


makeTree.prototype.addFile = function (fileData) {
    console.log(fileData);
    for (var i = 0; i < fileData.length; i++) {
        var file = fileData[i];
        if (!file.dir_ident) {
            this.tree.addBranch({
                title: file.file_name
            });
        } else {
            this.tree.addBranch({
                title: file.file_name,
                path: $("li[dir_ident=" + file.dir_ident + "]").attr("data-id")
            });
        }
        this.treeCount++;
        $("li[data-id=" + this.treeCount + "]").attr("file_ident", file.file_ident);
    }
    
};

makeTree.prototype.delete = function(){
    
    for (var i = 0; i< fileData.length; i++){
        var file = fileData[i];
        if(file.dir_ident == 0){

        }
    }
}