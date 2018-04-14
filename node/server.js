var app = require('exprees');

app.get('/',function(req,res){
    res.send('Hello');
});

app.listen('3000',function(){
    console.log('Connected 3000 port!');
});