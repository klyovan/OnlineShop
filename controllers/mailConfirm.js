var flash = require('connect-flash');

/**
 *
 * @module mailConfirm
 */
//model
var User = require ('../models/user');

/**
 * Middleware which is responsible for user account mail confirmation  .
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.verify  = function (req,res) {
    var secretToken = req.query.q;

    /**
     * return user that have same  secret token and activate user account via updating secretToken and active items
     */
    var user = User.findOneAndUpdate({'secretToken':secretToken},{$set:{active : true ,secretToken : ''}},{new:true},function (err,doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }

    });

    var userConfirm = User.findOne({'secretToken':secretToken});
    if (!userConfirm){
        req.flash('error_msg','No user find!');
        res.redirect('/users/verify');
    }

    req.flash('success_msg','Thanks, now you may login.');
    res.redirect('/users/signin');

};