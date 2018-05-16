var socket = io();
socket.on('connected', function(data){
    users[data.name] = data.color;
    insertCSS(data.name, data.color);
    insertWidget(data);
    decorations[data.name] = [];
});
socket.on('userdata', function(data){

    for(var i of data){
        users[i.name] = i.color;
        insertCSS(i.name, i.color);
        insertWidget(i);
        decorations[i.name] = [];
    }
});