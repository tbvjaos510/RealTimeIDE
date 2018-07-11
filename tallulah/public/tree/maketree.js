
var directoryname = $("input[name='directory']").val();
function makeProject(){
    var projectname = $("input[name='project']").val();    
    var ul = $("<ul />");
    var li = $("<li />");
    li.html(projectname);
    if(projectname!=""){
        $("#tree").append(li);
    }
    console.log(projectname);
}

function makeDirectory(){
    var ul = $("<ul />");
    var li = $("<li />");
    li.html(directoryname);
    if(directoryname!=""){
        if($("li").val()==projectname){
        }
    }
}



