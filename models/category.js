var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    categories: {type: Array},
    id: {type: String},
    name: {type: String},
    page_description: {type: String},
    page_title: {type: String},
    parent_category_id: {type: String},
    c_showInMenu:{type:Boolean}
});

module.exports = mongoose.model('mainCategory', schema,'categories');