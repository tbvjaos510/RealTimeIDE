// socket 파일
var app = require('express')();
var http = require('http');
var server = 
app.listen(3000,function(){
    console.log('Server Start On 3000');
});;
var io = require('socket.io').listen(server);

app.get('/',function(req,res){
    res.send("Hello World!");
});

app.get('/socket',function(req,res){
    res.sendFile(__dirname + "/main.html");
});

require('./socket/mainsock')(io);