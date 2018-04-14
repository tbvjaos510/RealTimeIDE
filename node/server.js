var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello');
});

app.get('/dgsw',function(req,res){
    res.send('서상희 병신');
});

app.listen('3000',function(){
    console.log('Connected 3000 port!');
});