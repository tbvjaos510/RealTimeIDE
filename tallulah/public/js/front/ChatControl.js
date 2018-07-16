var room;
$(document).ready(function(){
    $(".chat").on("click", function(){
        $(".chat-list").toggle();
    });

    $(".list-close").on("click", function(){
        $(this).parent().parent().hide();
    });

    $(".chat-close").on("click", function(){
        $(this).parent().hide();
    });

    $(document).on("click", ".chat-list>ul>li", function(){
        $(".chat-view").show();
        room = $(this).attr("project_ident");
        console.log(room);
    })

    $("input[class='message']").keydown(function(key, message){
        if(key.keyCode == 13){
            var message = $("input[class='message']").val();
            var li = $("<li />");
            li.css("background-color", "#2E64FE");
            li.css("width", "auto");
            li.css("color", "#fff");
            li.css("border-radius", "5px");
            li.css("float", "right");
            li.css("clear", "both");
            li.css("margin-right", "20px");
            li.css("margin-bottom", "6px");
            li.css("padding", "5px 8px");
            li.html(message);
            $(".chat-view>ul").append(li);
            $("input[class='message']").val("");
            chatControl(room, message);
            console.log(room, message);
        }
    });
    
    
});

