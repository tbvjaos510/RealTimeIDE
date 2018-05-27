var express = require('express');
var router = express.Router();
var mysql = require('../db/auth');
var passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('hello');
});

router.post('/auth', function (req, res) {
  if (!req.body.id || !req.body.password) //인자값이 정확히 들어왔는지 검사.
    return res.send({ success: false, message: "인자값이 부족합니다." });

  if (req.isAuthenticated()) { //passport session으로 인증 되어 있는지 검사.
    return res.send({ success: true, message: "로그인 되어 있습니다." });
  }
  else
    mysql.login(req.body.id, req.body.password, function (data) { //auth.js 에 login을 실행
      if (data.success === true) { //성공하면 passport 등록을 한다.
        req.login(data, function (err) {
          if (err) { return res.send(err); }
          return res.send(data);
        });
      }
      else
        return res.send(data);  //실패하면 인증하지 않고 그냥 데이터 전송
    });
});
router.post('/sign', function (req, res) {
  if (req.body.id != undefined && req.body.password != undefined && req.body.name != undefined) {
    mysql.signup(req.body.id, req.body.password, req.body.name, function (results) { 
      res.send(results);  //인자값이 전부 있으면 바로 signup을 실행한다.
    });

  } else {
    res.send({ success: false, message: "피라미터가 입력되지 않았습니다." });
  }
});

router.post('/logout', function (req, res) { //logout 실제 경로는 /login/logout이다.
  if (req.isAuthenticated()){
  req.logout(); //req.session에 저장되어 있는 세션 정보를 없앤 뒤에 로그아웃 한다.
    res.send({success : true, message : "로그아웃 성공"});
  }
  else{
    res.send({success : false, message : "로그인 되어 있지 않습니다."});
  }
});



module.exports = router;
