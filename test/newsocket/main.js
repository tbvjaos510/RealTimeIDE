// socket 파일
var app = require('express')();
app.get('/',function(req,res){
    res.send("Hello World!");
});

app.get('/socket',function(req,res){
    res.sendFile(__dirname + "/main.htm");
});
var server = require('http').createServer(app);
var io = require('socket.io')(server);

;
server.listen(3000,function(){
    console.log('Socket IO server port 3030');
});