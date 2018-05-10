var express = require('express');
var router = express.Router();
var mysql = require('../db/auth2');
var passport=  require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello');
});

// router.post('/auth', passport.authenticate('local', {
//   failtureRedirect : '/'
// }), function(req, res){
//   res.send('success');
// });

router.post('/auth', function(req, res){
  if (!req.body.id || !req.body.password)
    return res.send({success : false, message : "인자값이 부족합니다."});
  if (req.isAuthenticated()){
    return res.send({success : true, message : "로그인 되어 있습니다."});
  }
  else  
    mysql.login(req.body.id, req.body.password, function(data){
    if (data.success === true){
      req.login(data, function(err){
        if (err) {return res.send(err);}
        return res.send(data);
      });
    }
    else
    return res.send(data);
  });
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

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;
