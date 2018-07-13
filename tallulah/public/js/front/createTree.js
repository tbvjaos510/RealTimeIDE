function makeTree(selector) {
    this.selector = selector;
    this.treeCount = 0;
    this.tree = new orangeTree(selector);
    
}

makeTree.prototype.addDir = function (dirData) {
    for (var i = 0; i < dirData.length; i++) {
        var dir = dirData[i];
        console.log(dir.dir_parent);
        if (!dir.dir_parent) {//부모가 null, 최상위 파일
            this.tree.addBranch({
                folder: true,
                title: dir.dir_name
            });
        } else {
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
    for (var i = 0; i < fileData.length; i++) {
        var file = fileData[i];
        if (file.dir_ident == 0) {
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