var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var mysqls = require('./db/mysql');
var store = new MySQLStore(mysqls.options);
var passportconfig = require('./secure/passport');
var passport =require('passport');

global.connection = mysql.createConnection(mysqls.options);
global.connection.connect(function(err){
  if (err) throw err;
  console.log("MySQL Connect");
});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var app = express();
// view engine setup
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
  secret : 'asdl*&%^JKasdfs#$%^*dDqewtyu[jbv',
  resave:true,
  saveUninitialized : true,
  cookie : {maxAge : 3600000, httpOnly:true},
  store : store,
  rolling:true
}));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passportconfig();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
