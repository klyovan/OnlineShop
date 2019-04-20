var _         = require("underscore");
var randomstring = require('randomstring');
var mailer = require('../misc/mailer');
var passportSetup = require('../config/passport');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
var passport = require('passport');

var User = require ('../models/user');

module.exports.getSignup  = function (req, res) {
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }else
        res.render('users/signup',{title: "SignUp"});
};



module.exports.postSignup  = function (req,res){

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
                                        '<button type="submit" >Verify</button >\n' +
                                        '</form> '+
                                        '<br> Have a nice day :)';
                                    //send email
                                    var mailOptions = {
                                        from: 'OSF-Support ',
                                        to: 'klyovan88@gmail.com', //TODO change on req.body.email
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
}