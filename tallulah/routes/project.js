var express = require('express');
var router = express.Router();
var project = require('../db/projectdb');


router.get('/', function (req, res, next) {

});

router.post('/create', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.name || !req.body.desc)
      return res.send({ status: -1, success: false, message: '인자값이 전달되지 않았습니다.' });
    project.create(req.body.name, req.session.passport.user.ident, req.body.desc, function (data) {
      return res.send(data);
    });

  }
  else
    res.send({ status: 0, success: false, message: '로그인 되지 않았습니다.' });
});

router.post('/delete', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.ident) {
      return res.send({ status: -1, success: false, message: '인자값이 전달되지 않았습니다.' });
    }
    project.delete(req.body.ident, req.session.passport.user.ident, function (data) {
      return res.send(data);
    });
  }
  else {
    return res.send({ status: 0, success: false, message: '로그인 되지 않았습니다.' });
  }
});

router.post('/update',function(req,res){
  if(req.isAuthenticated()){
    if(!req.body.ident || !req.body.name || !req.body.desc){
      return res.send({status : -1, success : false, message : "인자값이 전달되지 않았습니다."});
    }
    project.update(req.session.passport.user.ident, req.body.ident, req.body.name, req.body.desc,function(data){
      return res.send(data);
    })
  }else{
    return res.send({status : -1, success : false, message : "로그인이 되지 않았습니다."});
  }
});

router.post('/get', function (req, res) {
  if (req.isAuthenticated()) {
    project.select(req.session.passport.user.ident, function (data) {
      res.send(data);
    });
  }
  else
    return res.send({ status: 0, success: false, message: '로그인 되지 않았습니다.' });
});


module.exports = router;
