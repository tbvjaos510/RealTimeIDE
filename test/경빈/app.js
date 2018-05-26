var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.send("Hello World!");
});
app.get('/socket', function(req, res){
    res.sendFile(__dirname + "/main.html");
});
app.listen(3000, function(){
    console.log('Server Start On 3000 Port');
});
require('./socket/mainsock')(io);
server.listen(3030, function(){
    console.log('Socket IO server listening on port 3030');
});