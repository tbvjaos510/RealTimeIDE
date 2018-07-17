var room;
$(document).ready(function(){
    $(".chat").on("click", function(){
        $(".chat-list").toggle();
    });

    $(".list-close").on("click", function(){
        $(this).parent().parent().hide();
    });

    $(".chat-close").on("click", function(){
        $(this).parent().parent().hide();
    });

    $(document).on("click", ".chat-list>ul>li", function(){
        $(".chat-view").show();
        room = $(this).attr("project_ident");
        getChat(room)
        console.log(room);
    })

    $("input[class='message']").keydown(function(key, message){
        if(key.keyCode == 13){
            var message = $("input[class='message']").val();
            var my_li = $("<li />");

            //내가보낸 채팅
            my_li.css("background-color", "#2E64FE");
            my_li.css("width", "auto");
            my_li.css("color", "#fff");
            my_li.css("border-radius", "5px");
            my_li.css("float", "right");
            my_li.css("clear", "both");
            my_li.css("margin-right", "20px");
            my_li.css("margin-bottom", "6px");
            my_li.css("padding", "5px 8px");
            my_li.html(message);

            // //남이보낸 채팅
            // your_li.css("background-color", "#E6E6E6");
            // your_li.css("width", "auto");
            // your_li.css("color", "#000");
            // your_li.css("border-radius", "5px");
            // your_li.css("float", "left");
            // your_li.css("clear", "both");
            // your_li.css("margin-bottom", "6px");
            // your_li.css("padding", "5px 8px");
            // your_li.html(message);

            //이름 띄우기
            
            $(".chat-area>ul").append(my_li);
            $("input[class='message']").val("");
            chatControl(room, message);
            console.log(room, message);

            $(".chat-view").scrollTop($(".chat-view")[0].scrollHeight);
        }
    });
    
    
    
});

