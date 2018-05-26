var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./socket/Socket')(io);

app.get('/',function(req,res){
    res.sendFile(__dirname+"/main.html");
});


app.listen(3000,function(){
    console.log('Server is Booting!');
});

server.listen(3030,function(){
    console.log('HTTP Server is Booting!');
});