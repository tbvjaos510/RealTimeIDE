
var directoryname = $("input[name='directory']").val();
function makeProject(){
    var projectname = $("input[name='project']").val();    
    var ul = $("<ul />");
    var li = $("<li />");
    li.html(projectname);
    li.addClass('context-menu-one');
    li.addClass(projectname);
    if(projectname!=""){
        $("#tree").append(li);
    }
    li.on('click', function(){
        var ul = $("<ul />");
        var _this = $(this).attr('class');
        var test = _this.replace("context-menu-one", ".");
        test.trim();
        console.log(test);
        var _class = "." + test;
        $(_class).on("click", function(){
            alert(1);
        })
    });
    console.log(projectname);
}




