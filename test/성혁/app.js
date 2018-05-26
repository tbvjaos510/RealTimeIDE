// socket 파일
var app = require('express')();
<<<<<<< HEAD
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./socket/controlSock')(io);
=======
var http = require('http');
var server = 
app.listen(3000,function(){
    console.log('Server Start On 3000');
});;
var io = require('socket.io').listen(server);
>>>>>>> 3d763371dc424685bb24dc74a5cbbfa127c050e3

app.get('/',function(req,res){
    res.send("Hello World!");
});

app.get('/socket',function(req,res){
    res.sendFile(__dirname + "/main.html");
});

<<<<<<< HEAD
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
=======
require('./socket/mainsock')(io);
>>>>>>> 3d763371dc424685bb24dc74a5cbbfa127c050e3
