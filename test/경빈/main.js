var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.get('/', function(req, res){
    res.send("Hello World!");  
});

server.listen(3000, function(){
    console.log("Server is On 3000 port!");
});

var io = require('socket.io')(server);

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(server){
    io.emit("Connect","New Connect!");
    
    server.on('data', function(data){
        console.log(data);
        io.emit('data', data);
    });
});

