var chat;

function connect_chat() {
    chat = io('/chat', {
        query: {
            name: username
        }
    })
    
chat.on('chattings', function (data) {
    console.log(data);
    $(".chat-view>ul>li").remove()
    for (var chats of data) {
        var li = $("<li />")
        li.css("background-color", "#2E64FE");
        li.css("width", "auto");
        li.css("color", "#fff");
        li.css("border-radius", "5px");
        if (chats.name === username)
            li.css("float", "right");
        else
            li.css("float", "left");
        li.css("clear", "both");
        li.css("margin-right", "20px");
        li.css("margin-bottom", "6px");
        li.css("padding", "5px 8px");
        li.html(chats.data);
        $(".chat-view>ul").append(li);
    }
})
}

function joinRoom(rid) {
    chat.emit('join', rid);
}

function getChat(rname) {
    chat.emit('getchat', rname);
}

function chatControl(rname, data) {
    chat.emit('chat', {
        room: rname,
        data: data
    })
}