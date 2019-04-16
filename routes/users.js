var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
var isLoggedIn = require('../config/auth').ensureAuthenticated;
var User = require ('../models/user');
var passportSetup = require('../config/passport');
var randomstring = require('randomstring');
var mailer = require('../misc/mailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.get('/google',passport.authenticate('google',{
  scope: ['profile']
}));


router.get('/auth/google/redirect',passport.authenticate('google',{failureRedirect: '/users/signup'}),  (err, req, res, next) => {
    if (err.name === 'TokenError') {
      res.redirect('/users/signup'); // redirect them back to the login page
    } else {
      // Handle other errors here
    }
  },
      (req, res) => { // On success, redirect back to '/'
        res.redirect('/users/profile');

      }
);


router.get('/signup',function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/users/profile');
  }else
  res.render('users/signup',{title: "SignUp"});
});


router.post('/signup',function (req,res){

  var messages = [];
  console.log(req.body);
  var {name,email,password,password2} = req.body;
  var secretToken = randomstring.generate();
  if(password !== password2){
    messages.push({msg: 'Passwords do not match'});
  }

  if(password.length < 8){
    messages.push({msg: 'Password should be at least 8 characters'});
  }

  if (messages.length > 0 ){
    res.render('users/signup',{title: "SignUp", messages:messages})
  } else {
    User.findOne({ email: email},function (err,user) {
      if (err) {
        return done(err);
      }
      if (user){
        messages.push({msg: 'Email is already in use.'});
         res.render('users/signup',{title: "SignUp", messages:messages});
      }
      else {

      var newUser = new User({
        name: name,
        email: email,
        password: password,
         secretToken: secretToken,
         active: false
      });

      bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(newUser.password,salt,function (err,hash) {
          {
            if (err) throw err;

          //set password to hashed
            newUser.password = hash;

            newUser.save()
                .then(user => {

                    //compose email
                   var html = 'Hi there, <br/> thank you for registering<br><br>'+
                       'Click on the button to confirm your account.' +
                   '<form action="http://127.0.0.1:3000/users/verify?q='+ secretToken +'" method="post">\n' +
                       '<button type="submit" >Go</button >\n' +
                       '</form> '+
                  '<br> Have a nice day :)';
                   //send email
                  var mailOptions = {
    from: 'OSF-Support ',
    to: 'klyovan88@gmail.com', //TODO change on req.bode.email
    subject: 'Verification',
    html: html
};
                     mailer.sendMail(mailOptions,function (err,data) {
                       if (err) console.log(err);
                       else console.log(data);
                     });

                  req.flash('success_msg','Please check your email!');
                  res.redirect('/users/signin');
                })
                .catch(err => console.log(err));
                      }
                  })
              })
             }
          })
        }
    });

router.get('/profile',isLoggedIn,function(req,res){
  res.render('users/profile',{title: "Prodile"});
});


router.get('/signin',function (req, res, next) {
  if (req.isAuthenticated()){
    req.flash('error_msg','Bad request, you already logged in!');
    res.redirect('/users/profile')}
  res.render('users/signin',{title: "SignIn"})
});

router.post('/signin',function(req,res,next){
  passport.authenticate('local',{
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
  })(req,res,next);
});



router.post('/verify',function (req,res,next) {
  var secretToken = req.query.q;

  //find acc that mathces the secret token
  var user = User.findOneAndUpdate({'secretToken':secretToken},{$set:{active : true ,secretToken : ''}},{new:true},function (err,doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log(doc );

  });
  var userConfirm =User.findOne({'secretToken':secretToken});
  if (!userConfirm){
    req.flash('error_msg','No user find!');
    res.redirect('/users/verify');
  }

  req.flash('success_msg','Thanks, now you may login.');
  res.redirect('/users/signin');

});


router.get('/logout',function (req,res) {
  req.logout();
  req.flash('success_msg','You are logged out');
  res.redirect('/users/signin');
});

module.exports = router;

