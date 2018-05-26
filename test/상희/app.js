var app = require('express')();

app.get('/', function(req, res){
    res.send('Hello World');
});
app.get('/socket', function(req, res){
    res.sendFile(__dirname + "/main.html");
});


var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./socket/mainsock')(io);

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});