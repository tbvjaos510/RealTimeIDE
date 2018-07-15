var passport = require('passport');
var auth = require('../db/auth');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

    //passport 인증 - 인자값을 받은 user 객체를 사용하여 req.session.passport.user에 저장함
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    //passport 인증 - 서버로 들어오는 요청마다 실행하는 메소드.
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

};