var passport = require('passport');
var auth = require('../db/auth2');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done){
    done(null, user);
});

passport.deserializeUser(function (user, done){
    done(null, user);
});



passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField : 'password',
    session:true,
    passReqToCallback: false,
},
    function(username, password, done) {
        auth.login(username, password, function(data){
            if (data.status == 4){
                return done(null, data);
            }
            else{
                return done(null, false, data);
            }
        });
    }
));
