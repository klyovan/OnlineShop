var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/signup',function (req, res) {
  res.render('users/signup',{title: "SignUp"})
});
router.post('/signup',function (req,res){
  var array = [];


});

router.get('/profle',function(){
  res.render('users/profile');
});

router.get('/signin',function (req, res) {
  res.render('users/signin',{title: "SignIn"})
});
module.exports = router;
