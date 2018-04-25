var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello');
});

app.get('/dgsw',function(req,res){
    res.send('서상희 병신');
});

app.get('/sang',function(req, res){
    res.send('남형진 병신 남형진 바보 에베베베베');
});

app.get('/ang',function(req,res){
    res.send(`<html>
    <head>
    <script>alert('1');</script>
    </head>
    </html>`)
});

app.listen('3000',function(){
    console.log('Connected 3000 port!');
});