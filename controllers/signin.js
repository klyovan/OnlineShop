var _         = require("underscore");
var passportSetup = require('../config/passport');
var passport = require('passport');

var User = require ('../models/user');
var Order = require ('../models/order');
var Cart = require ('../models/cart');

module.exports.getSignIn  =function (req, res, next) {
    if (req.isAuthenticated()){
       // req.flash('error_msg','Bad request, you already logged in!');
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

module.exports.orders = function(req,res){
    Order.find({user: req.user},function (err, orders) {
        if (err){
            console.log(err);
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('users/orders',{_     : _, orders: orders, title: "Prodile", user: req.user});
    });
    // res.render('users/profile',{title: "Prodile",user: req.user});

};


module.exports.logout =

    function (req,res) {
    req.session.cart = null;
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/signin');
};