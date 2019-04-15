var passport = require('passport');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');

var User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy({
                callbackURL: '/users/auth/google/redirect',
                clientID: keys.google.clientID,
                clientSecret:keys.google.clientSecret
            },function(accessToken, refreshToken, profile, done) {
                User.findOne({googleID:profile.id}).then(function (currentUser) {
                    //if exist
                    if(currentUser){
                        // console.log('user is ',currentUser)
                        done(null,currentUser);
                    }else{
                        new User ({
                            name: profile.displayName,
                            googleID: profile.id
                        }).save()
                            .then((newUser)=>{
                                //       console.log("new user created" + newUser);
                                done(null,newUser);
                            })}
                });

            }
        )
    )
};


