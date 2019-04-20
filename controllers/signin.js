var _         = require("underscore");
var passportSetup = require('../config/passport');
var passport = require('passport');

var User = require ('../models/user');

module.exports.getSignIn  =function (req, res, next) {
    if (req.isAuthenticated()){
        req.flash('error_msg','Bad request, you already logged in!');
        res.redirect('/users/profile')}
    res.render('users/signin',{title: "SignIn"})
};

module.exports.postSignIn  = function(req,res,next){
    passport.authenticate('local',{
        successRedirect: '/users/profile',
        failureRedirect: '/users/signin',
        failureFlash: true
    })(req,res,next);
};

module.exports.profile = function(req,res){
    res.render('users/profile',{title: "Prodile",user: req.user});
};


module.exports.logout =

    function (req,res) {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/signin');
};