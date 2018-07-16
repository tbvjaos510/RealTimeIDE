if (username !== 'none') {
    var chat = io('/chat', {
        query: {
            name: username
        }
    })
}
function joinRoom(rid){
    chat.emit('join', 'chat' + rid);
}
function chatControl(rname, data){
    chat.emit('chat', {room, })
}