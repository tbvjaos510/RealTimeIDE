var app = require('express')();

var server=require('http').createServer(app);
var io=require('socket.io')(server);

app.get('/', function (req, res) {
    res.send('hello, world');
});

app.get('/socket',function(req,res){
    res.sendFile(__dirname+'/main.html');
});
app.get('/socket/room1',function(req,res){
    res.sendFile(__dirname+'/room1.html');
});
app.get('/socket/room2',function(req,res){
    res.sendFile(__dirname+'/room2.html');
});
app.get('/socket/room3',function(req,res){
    res.sendFile(__dirname+'/room3.html');
});

require('./socket/mainsock')(io);
require('./socket/controlSoc')(io);

app.listen(3000, function () {
    console.log('Server start on 3000');
});

server.listen(3030,function(){
    console.log('Socket IO server listening on port 3000');
});