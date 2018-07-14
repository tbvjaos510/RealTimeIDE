function getDirectorys(project_ident){
    var result = $.ajax({
        url: "directory/get",
        data: {
          ident: project_ident
        },
        method: "POST",
        async: false
      });
    return result.responseJSON;
}

function getFiles(project_ident){
    var result = $.ajax({
        url: "file/get",
        data: {
          ident: project_ident
        },
        method: "POST",
        async: false
      });
    return result.responseJSON.data;
}