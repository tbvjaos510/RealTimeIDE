var express = require('express');
var router = express.Router();
var mysql = require('../db/auth2');
var passport=  require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello');
});
router.post('/auth', passport.authenticate('local', {
  failtureRedirect : '/'
}), function(req, res){
  res.send('success');
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
