var app = require('express')();


app.get('/', function(req, res){
    res.send("Hello World!");
});
app.get('/socket', function(req, res){
    res.sendFile(__dirname + "/main.html");
});
app.get('/socket', function(req, res){
    res.sendfile(__dirname+"/room1.html");
});
app.get('/socket', function(req, res){
    res.sendfile(__dirname+"/room2.html");
});
app.get('/socket', function(req, res){
    res.sendfile(__dirname+"/room3.html");
}); 
app.listen(3000, function(){
    console.log('Server Start On 3000 Port');
});
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./socket/controlsock')(io);
//require('./socket/mainsock')(io);
server.listen(3030, function(){
    console.log('Socket IO server listening on port 3030');
});