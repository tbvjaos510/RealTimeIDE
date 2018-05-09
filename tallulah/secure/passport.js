var passport = require('passport');
var auth = require('../db/auth2');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

    passport.serializeUser(function (user, done) {
        console.log('serializeUser '+ user.name);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserializeUser '+ user.name);
        done(null, user);
    });



    passport.use('local',new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    },
        function (username, password, done) {
            auth.login(username, password, function (data) {
                console.log(data);
                if (data.status == 4) {
                    return done(null, data);
                }
                else {
                    return done(null, false, data);
                }
            });
        }
    ));
}