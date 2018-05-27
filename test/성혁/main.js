var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get("/", function(req, res) {
    res.send('Hello World!');
});

app.get("/main", function(req, res) {
    res.sendFile(__dirname + '/main.html');
});

server.listen(3000, function() {
    console.log("Server Start On 3000 Port!");
});

io.on('connection', function(server) {
    console.log("Server Connected!");
    io.emit("message", "접속");
});

