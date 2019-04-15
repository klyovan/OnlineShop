var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: {type: String, required: true},
    email:  String,
    password: String,
    googleID: String
    // secretToken: String,
    // active: Boolean
});



module.exports = mongoose.model('User', userSchema,);