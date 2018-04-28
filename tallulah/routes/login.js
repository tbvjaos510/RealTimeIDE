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

module.exports = router;
