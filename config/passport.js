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
                        done(null,currentUser);
                    }else{
                        new User ({
                            name: profile.displayName,
                            googleID: profile.id
                        }).save()
                            .then((newUser)=>{
                                done(null,newUser);
                            })}
                });

            }
        )
    )
};

module.exports = function (passport) {
    passport.use(
      new LocalStrategy({usernameField: 'email'}, function(email,password,done){
          //match email
          User.findOne({email:email})
              .then(function (user) {
                  if (!user){
                      return done(null,false,{message: 'That email is not registered'})
                  }



                  //match password
                  bcrypt.compare(password, user.password,function (err, Match) {
                    if (err) throw err;

                    if(!Match){
                        return done(null,false,{message: 'Password incorrect'});

                    }

                    if (!user.active){
                        return done(null,false,{message: 'You need verify email first'});
                    }

                      return done(null,user);
                  });
              })
              .catch(function (err) {
                  console.log(err);
              })
      })
    );

};
