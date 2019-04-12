var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    page_description: {type: String},
    page_title: {type: String},
    name: {type: String},
    c_isNewtest: {type: Boolean},
    price: {type: Number},
    variation_attributes: {type: Array},
    id: {type: String},
    currency:{type: String},
    master: {type:Object},
    image_groups: {type:Array},
    c_isNew: {type: Boolean},
    short_description: {type: String},
    orderable: {type: Boolean},
    variants: {type: Array},
    type: {type: Object},
    long_description: {type: String}
});

module.exports = mongoose.model('Product', schema,'products');