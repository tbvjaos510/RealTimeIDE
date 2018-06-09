var express = require('express');
var router = express.Router();
var directory = require('../db/directory')

router.get('/', function(req, res){
    res.send("aaa");
});

router.post('/create',function(req,res){
    if(req.isAuthenticated()){
        if(!req.body.dirName || !req.body.ident){
            return res.send({statue : -1, success: false, message : "인자값이 전달되지 않았습니다."});
        }
        directory.create(req.body.dirName, req.body.ident,req.body.dirident,function(data){ 
            console.log(data);

            return res.send(data);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
      
      }

})
router.post('/delete',function(req,res){
    if(req.isAuthenticated()){
        if(!req.body.dirName){
            return res.send({statue : -1, success: false, message : "인자값이 전달되지 않았습니다."});
        }
        directory.delete(req.body.dirName, function(data){
            return res.send(data);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
      }
}); 

router.post('/update',function(req,res){
    if(req.isAuthenticated()){
        if(!req.body.ident || !req.body.dirName){
            console.log(1);
            return res.send({statue : -1, success: false, message : "인자값이 전달되지 않았습니다."});
        }
        directory.update(req.body.dirName,req.body.ident,function(data){
            return res.send(data);
        })
    }else{
        return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
      }
})

router.post('/get',function(req,res){
    if(req.isAuthenticated()){
        if(!req.body.ident){
            return res.send({statue : 1, success : false, message : "인자값이 전달 되지 않았습니다."});
        }
        directory.get(req.body.ident, function(data){
            return res.send(data);
        })
    }
})

module.exports = router;
