$(document).ready(function(){
    
});


var directoryname = $("input[name='directory']").val();
function makeProject(){
    var projectname = $("input[name='project']").val();    
    var ul = $("<ul />");
    var div = $("<div />");
    div.html(projectname);
    div.addClass('context-menu-one');
    div.attr('id', projectname);
    if(projectname!=""){
        $("#tree").append(div);
        $("#tree>li").append(ul);
    }
    console.log(projectname);
}





