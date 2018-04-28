var express = require('express');
var router = express.Router();
var mysql = require('../db/mysql');

mysql.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  mysql.test(function (results){
      res.send(results);
  });
});

router.post('/auth',function(req,res){
  if (req.body.id != undefined && req.body.password != undefined){
    mysql.login(req.body.id, req.body.password, function(results){
      if(results){
        res.send(results);
      }else {
        res.send(results);
      }
    })    
  }else {
    res.send(results);
  }
});
module.exports = router;
