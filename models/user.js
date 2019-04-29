var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    name: {type: String, required: true},
    email:  String,
    password: String,
    googleID: String,
     secretToken: String,
     active: Boolean,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    Date: {type: Date, default: Date.now()}

});

userSchema.pre('save', function(next) {
    var user = this;
    var SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});



module.exports = mongoose.model('User', userSchema,);