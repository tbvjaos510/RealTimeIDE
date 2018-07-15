var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated())
  res.render("main.html", {uname : req.session.passport.user.name});
  else 
  res.render("main.html", {uname : "none"});
});

module.exports = router;
