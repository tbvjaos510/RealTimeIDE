var express = require('express');
var router = express.Router();
var project = require('../db/projectdb');
var mzip = require('../file/zip')
var fs = require('fs')

router.get('/', function (req, res, next) {

});

router.post('/create', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.name || !req.body.desc || !req.body.private)
      return res.send({
        status: -1,
        success: false,
        message: '인자값이 전달되지 않았습니다.'
      });
    project.create(req.body.name, req.session.passport.user.ident, req.body.desc, req.body.private, function (data) {
      return res.send(data);
    });

  } else
    res.send({
      status: 0,
      success: false,
      message: '로그인 되지 않았습니다.'
    });
});
router.post('/getZip', function (req, res) {
  if (!req.body.pid)
    return res.send({
      status: 0,
      success: false,
      message: '인자값이 전달되지 않았습니다'
    })
  // res.type('.zip')
  //
  mzip.makeZip(req.body.pid, (data) => {
    // console.log(new Buffer(data, 'binary'))
    fs.writeFile('project.zip', data, 'binary', (err) => {
      if (err) throw err;
      console.log('file create')
      res.send({
        success: true
      })
    })
  })
})
router.get('/getZip', function (req, res) {
  res.download('project.zip', function (err) {
    if (err) console.log(err);
    fs.unlink('project.zip', function(err) {
      if (err) console.log(err)
      console.log('file delete')
    })
  })
  // fs.unlink('project.zip')
})
router.post('/insert', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.pid)
      return res.send({
        status: -1,
        success: false,
        message: '인자값이 전달되지 않았습니다.'
      });
    project.insert(req.session.passport.user.ident, req.body.pid, 1, function (data) {
      return res.send(data);
    });
  } else
    return res.send({
      status: 0,
      success: false,
      message: '로그인 되지 않았습니다.'
    });
});
router.post('/invite', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.pid || !req.body.userid)
      return res.send({
        status: -1,
        success: false,
        message: '인자값이 전달되지 않았습니다.'
      });
    project.invite(req.body.userid, req.body.pid, 1, function (data) {
      return res.send(data);
    });
  } else
    return res.send({
      status: 0,
      success: false,
      message: '로그인 되지 않았습니다.'
    });
});

router.post('/leave', function (req, res) {
  console.log(2);
  if (req.isAuthenticated()) {
    if (!req.body.pident) {
      return res.send({
        status: -1,
        success: false,
        message: "인자값이 전달되지 않았습니다."
      });
    }
    project.leave(req.session.passport.user.ident, req.body.pident, function (data) {
      return res.send(data);
    })
  } else
    return res.send({
      status: 0,
      success: false,
      message: '로그인 되지 않았습니다.'
    });
})

router.post('/delete', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.ident) {
      return res.send({
        status: -1,
        success: false,
        message: '인자값이 전달되지 않았습니다.'
      });
    }
    project.delete(req.body.ident, req.session.passport.user.ident, function (data) {
      return res.send(data);
    });
  } else {
    return res.send({
      status: 0,
      success: false,
      message: '로그인 되지 않았습니다.'
    });
  }
});

router.post('/update', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.ident || !req.body.name) {
      return res.send({
        status: -1,
        success: false,
        message: "인자값이 전달되지 않았습니다."
      });
    }
    project.update(req.session.passport.user.ident, req.body.ident, req.body.name, req.body.desc, 1, function (data) {
      return res.send(data);
    })
  } else {
    return res.send({
      status: -1,
      success: false,
      message: "로그인이 되지 않았습니다."
    });
  }
});

router.post('/search', function (req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.keyword)
      return res.send({
        status: -1,
        success: false,
        message: "인자값이 전달되지 않았습니다."
      });
    else {

      project.search(req.body.keyword, function (data) {
        return res.send(data);
      })
    }
  } else {
    return res.send({
      status: -1,
      success: false,
      message: "로그인이 되지 않았습니다."
    });
  }
});

router.post('/get', function (req, res) {
  console.log(req.session.passport.user.ident);
  if (req.isAuthenticated()) {
    project.select(req.session.passport.user.ident, function (data) {
      res.send(data);
    });
  } else
    return res.send({
      status: 0,
      success: false,
      message: '로그인 되지 않았습니다.'
    });
});


module.exports = router;
