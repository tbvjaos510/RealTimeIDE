var chat;

function addChat(chats) {
    var li = $("<li />")

    if (chats.name === username) {
        li.css("background-color", "#2E64FE");
        li.css("color", "#fff");

        li.css("float", "right");
    } else {
        chats.data = chats.name + ":" + chats.data
        li.css("background-color", "#E6E6E6");
        li.css("color", "#000");
        li.css("float", "left");
    }
    li.css("border-radius", "5px");
    li.css("width", "auto");
    li.css("clear", "both");
    li.css("margin-right", "20px");
    li.css("margin-bottom", "6px");
    li.css("padding", "5px 8px");
    li.html(chats.data);
    $(".chat-area>ul").append(li);
}

function connect_chat() {
    chat = io('/chat', {
        query: {
            name: username
        }
    })

    chat.on('chattings', function (data) {
        console.log(data);
        $(".chat-area>ul>li").remove()
        for (var chats of data) {
            addChat(chats)
        }
    })

    chat.on('refresh', function () {
        tree.makeDefault();
    })
    chat.on('chat', function (data) {
        addChat(data)
    })
    chat.on('player', function (data) {
        console.log(data)
        $("#userlist>li").remove();
        for (var i of data) {           
            var li = $(`<li><span>${i.name}</span><span class='uk-float-right uk-text-success'>●</span></li>`);
            $("#userlist").append(li);
        }
    })
}

function getPlayer() {
    chat.emit('player', "")
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