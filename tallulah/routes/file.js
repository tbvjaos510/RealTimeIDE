var file = require('../db/file');
var express = require('express');
var router = express.Router();

router.post('/',function(req,res){
    console.log(req.body.test);
    return res.send('123');
})

router.post('/create',function(req,res){
    if(req.isAuthenticated()){
        console.log(req.body.pident + ", " + req.body.ident+", " + req.body.name);
        if(!req.body.pident || !req.body.name){
            return res.send({status : 1, success : false, message : "인자값이 전달되지 않았습니다."});
        }
        file.create(req.body.pident,req.body.ident,req.body.name,function(data){
            return res.send(data);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
    }
})

router.post('/updateContent',function(req,res){ //파일 설명 변경
    if(req.isAuthenticated()){
        if(!req.body.ident || !req.body.content){
            return res.send({status : 1, success : false, message : "인자값이 전달되지 않았습니다."});
        }
        file.updateContent(req.body.ident,req.body.content,function(date){
            return res.send(date);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
    }
})

router.post('/updateFilename',function(req,res){ // 파일 이름 변경
    if(req.isAuthenticated()){
        if(!req.body.ident || !req.body.fileName){
            return res.send({status : 1, success : false, message : "인자값이 전달되지 않았습니다."});
        }
        file.updateFilename(req.body.ident,req.body.fileName,function(data){
            return res.send(data);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
    }
})

router.post('/delete',function(req,res){
    if(req.isAuthenticated()){
        if(!req.body.ident){
            return res.send({status : 1, success : false, message : "인자값이 전달되지 않았습니다."});
        }
        file.delete(req.body.ident,function(data){
            return res.send(data);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
    }
})

router.post('/get',function(req,res){
    console.log(req.body.ident);
    if(req.isAuthenticated()){
        if(!req.body.pident){
            return res.send({status : 1, success : false, message : "인자값이 전달되지 않았습니다."});
        }
        file.get(req.body.pident,req.body.ident, function(date){
            return res.send(date);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
    }
})

router.post('/getFile',function(req,res){
    if(req.isAuthenticated()){
        if(!req.body.fident){
            return res.send({status : 1, success : false, message : "인자값이 전달되지 않았습니다."});
        }
        file.getFile(req.body.fident, function(date){
            return res.send(date);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
    }
})


module.exports = router;