// socket 파일
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./socket/controlSock')(io);

app.get('/',function(req,res){
    res.send("Hello World!");
});

app.get('/socket',function(req,res){
    res.sendFile(__dirname + "/main.html");
});

app.get('/socket/room1', function(req, res) {
    res.sendFile(__dirname + "/room1.html");
});

app.get('/socket/room2', function(req, res) {
    res.sendFile(__dirname + "/room2.html");
});

app.get('/socket/room3', function(req, res) {
    res.sendFile(__dirname + "/room3.html");
});

app.listen(3000,function(){
    console.log('Server Start On 3000');
});

require('./socket/mainsock')(io);

server.listen(3030,function(){
    console.log('Socket IO server port 3030');
});
