var express = require('express');
var router = express.Router();
var mysql = require('../db/auth2');


/* GET users listing. */
router.get('/', function(req, res, next) {
  mysql.test(function (results){
      res.send(results);
  });
});
router.post('/auth',function(req,res){
    console.log(req.body);
  if (req.body.id != undefined && req.body.password != undefined){
    mysql.login(req.body.id, req.body.password, function(results){
        res.send(results);
    });
    
  } else {
    res.send({success : false, message:"피라미터가 입력되지 않았습니다."});
  }
});

router.post('/sign',function(req,res){
  if(req.body.id != undefined && req.body.password != undefined && req.body.name != undefined){
    mysql.signup(req.body.id, req.body.password, req.body.name, function(results){
      res.send(results);
    });
    
  } else {
    res.send({success : false, message:"피라미터가 입력되지 않았습니다."});
  }
});

module.exports = router;
