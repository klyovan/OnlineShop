var _         = require("underscore");
var passportSetup = require('../config/passport');
var passport = require('passport');
var crypto = require('crypto');
var mailer = require('../misc/mailer');

//Models
var User = require ('../models/user');
var Order = require ('../models/order');
var Cart = require ('../models/cart');


var async = require('async');


/**
 * @module signin
 */


/**
 * Middleware which is responsible for rendering login page.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.getSignIn  =function (req, res, next) {
    if (req.isAuthenticated()){
       // req.flash('error_msg','Bad request, you already logged in!');
        res.redirect('/users/profile')}

    res.render('users/signin',{title: "SignIn"})
};



/**
 * Middleware which is responsible for serving login form using passport module.
 * @function
 * @requires passport
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.postSignIn  = function(req,res,next){
    passport.authenticate('local',{
        successRedirect: '/users/profile',
        failureRedirect: '/users/signin',
        failureFlash: true
    })(req,res,next);
};


/**
 * Middleware which is responsible for rendering profile page.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.profile = function(req,res){
    res.render('users/profile',{_     : _, title: "Profile",user: req.user});
};


/**
 * Middleware which is responsible for rendering orders history page.
 * @function
 * @requires Order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
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
        res.render('users/orders',{_     : _, orders: orders, title: "Profile", user: req.user});
    });
};


/**
 * Middleware which is responsible for logout user .
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.logout =

    function (req,res) {
    req.session.cart = null;
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/signin');
};


/**
 * Middleware which is responsible for rendering forgot password page.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.getForgot = function (req,res) {

    res.render('users/forgot', {title:"Reset password", user: req.user });
};


/**
 * Middleware which is responsible for serving forgot password form and send mail with token to user who has forgotten his password  .
 * @function
 * @requires async,crypto,User
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @requires mailer
 * @return {undefined}
 */
module.exports.postForgot = function (req,res,next) {

    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/users/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var html = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n';
            //send email
            var mailOptions = {
                from: 'ECOMM-Support ',
                to: 'klyovan88@gmail.com', //TODO change on req.body.email
                subject: 'Password Reset',
                html: html
            };
            mailer.sendMail(mailOptions, function (err, data) {
                if (err) console.log(err);
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.'); //vott tak nado delati
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/users/forgot');
    });
};


/**
 * Middleware which is responsible for render reset password form and check if reset password token is active.
 * @function
 * @requires User
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */
module.exports.getReset = function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/forgot');
        }
        res.render('users/resetPassword', {
            title: "ResetPassword",
            user: req.user,
            token:req.params.token
        });
    });
};

/**
 * Middleware which is responsible for serving reset password form and send mail to user with notice what password has been changed .
 * @function
 * @requires User, mailer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {undefined}
 */
module.exports.postReset = function(req, res) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('/users/forgot');
                }
                if(req.body.password !== req.body.confirm){
                    req.flash('error_msg', 'Passwords do not match.');
                    return res.redirect('/users/reset/'+req.params.token);
                }

                if(req.body.password.length < 8){
                    req.flash('error_msg', 'Password should be at least 8 characters');
                    return res.redirect('/users/reset/'+req.params.token);
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    if (err)console.log(err);
                });


            var html =  'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n';
            //send email
            var mailOptions = {
                from: 'ECOMM-Support ',
                to: 'klyovan88@gmail.com', //TODO change on req.body.email
                subject: 'Your password has been changed',
                html: html
            };

            mailer.sendMail(mailOptions, function (err, data,user) {
                if (err) console.log(err);
                req.flash('success_msg', 'Success! Your password has been changed. Now you can log in'); //vott tak nado delati
                res.redirect('/users/signin');
            });
            });
    };

