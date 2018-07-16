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
var srouter = require('./socket/socket_nsp');
var stdin = process.stdin;
var nsps = [];
var app = express();


//입력받기
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

global.addFileNsp = function (ident){
  nsps.push(srouter(io, "room" + ident));
        
}
//global은 전역변수이다. 즉 다른 모듈에서도 connection을 통해 언제나 참조 가능함.
global.connection = mysql.createConnection(mysqls.options);
connection.connect(function(err){  //db 연결
  if (err) throw err;
  console.log("MySQL Connect");
  connection.query("select file_ident from t_file", function(err, result){
    if (err){
      console.log(err);
    } else {
      for(var i of result){
        addFileNsp(i.file_ident);        
      }
    }
  });
});

stdin.on('data', function(key){
  if (key === 'g'){
    for(var i of nsps){
      console.log(i.name + '-' +Object.keys(i.connected).length);
    }
  }
  else if(key === 's'){
    process.exit(1);
  }
  
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var projectRouter = require('./routes/project');
var directoryRouter = require('./routes/directory');
var fileRouter = require('./routes/file');
// view engine setup
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({ //세션정보를 저장 
  secret : 'asdl*&%^JKasdfs#$%^*dDqewtyu[jbv',  //secret - 세션을 암호화하는 salt이다. 주기적으로 변경하자.
  resave:true,
  saveUninitialized : true,
  cookie : {maxAge : 1000*60*60, httpOnly:true},
  store : store,  //저장하는곳은 mysql이다. 정확한 위치는 (dgsw_sms/sessions)에 저장됨.
  rolling:true
}));
//app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//passport.js를 사용함.
passportconfig();
//socket.io를 사용함.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter); //링크 /login에 routes/login.js 라우터를 등록한다.
app.use('/project', projectRouter);
app.use('/directory',directoryRouter);
app.use('/file',fileRouter);
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
