$(document).ready(function(){
    $(".chat").on("click", function(){
        $(".chat-list").show();
    });

    $(".chat-close").on("click", function(){
        $(this).parent().parent().hide();
    })


    $("input[class='message']").keydown(function(key){
        if(key.keyCode == 13){
            var message = $("input[class='message']").val();
            var li = $("<li />");
            li.css("background-color", "#2E64FE");
            li.css("width", "auto");
            li.css("color", "#fff");
            li.css("border-radius", "5px");
            li.css("padding-left", "3px");
            li.css("padding-right", "3px");
            li.css("float", "right");
            li.css("clear", "both");
            li.css("margin-right", "20px");
            li.css("margin-bottom", "3px");
            li.html(message);
            $(".chat-view>ul").append(li);
            $("input[class='message']").val("");
        }
    })
});
var li = $("<li />");
