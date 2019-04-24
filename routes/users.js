var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
var isLoggedIn = require('../config/auth').ensureAuthenticated;
// var User = require ('../models/user');
// var passportSetup = require('../config/passport');
// var randomstring = require('randomstring');
// var mailer = require('../misc/mailer');

var googleAuth = require('../controllers/Google-authentication');
 var signUp = require('../controllers/signup');
 var signIn = require('../controllers/signin');
 var mailConfirm = require('../controllers/mailConfirm');


/* GET product listing. */




router.get('/google',googleAuth.getProfile);

router.get('/auth/google/redirect',passport.authenticate('google',{failureRedirect: '/users/signup'}),  (err, req, res, next) => {
        if (err.name === 'TokenError') {
            res.redirect('/users/signup'); // redirect them back to the login page
        } else {
            // Handle other errors here
        }
    },
    (req, res) => { // On success, redirect back to '/'
        res.redirect('/users/profile');

    });

router.get('/signup',signUp.getSignup);

router.post('/signup',signUp.postSignup);

router.get('/profile',isLoggedIn,signIn.profile);

router.get('/signin',signIn.getSignIn);

router.post('/signin',signIn.postSignIn);

router.post('/verify',mailConfirm.verify);

router.get('/logout',isLoggedIn,signIn.logout);

router.get('/orders',isLoggedIn,signIn.orders);

router.get('/forgot',signIn.getForgot);

router.post('/forgot',signIn.postForgot);

router.get('/reset/:token',signIn.getReset);

router.post('/reset/:token',signIn.postReset);

module.exports = router;

