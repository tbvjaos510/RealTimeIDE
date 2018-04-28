var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello');
});
app.get('/dgsw',function(req,res){
    res.send('dgsw');
});

app.get('/sang',function(req, res){
    res.send('sang');
});

app.get('/ang',function(req,res){
    res.send("hello");
});

app.post('/login',function(req,res){

});

app.listen('3000',function(){
    console.log('Connected 3000 port!');
});