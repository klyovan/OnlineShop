var flash = require('connect-flash');

var User = require ('../models/user');
module.exports.verify  = function (req,res,next) {
    var secretToken = req.query.q;

    /**
     * return user that have same  secret token
     */
    var user = User.findOneAndUpdate({'secretToken':secretToken},{$set:{active : true ,secretToken : ''}},{new:true},function (err,doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }

    });

    var userConfirm =User.findOne({'secretToken':secretToken});
    if (!userConfirm){
        req.flash('error_msg','No user find!');
        res.redirect('/users/verify');
    }

    req.flash('success_msg','Thanks, now you may login.');
    res.redirect('/users/signin');

};