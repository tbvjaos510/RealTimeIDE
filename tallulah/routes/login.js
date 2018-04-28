var express = require('express');
var router = express.Router();
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("login page");
});

module.exports = router;
