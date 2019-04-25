var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  reviewer: String,
  reviewText: String,
  stars: Number,
  productId: String
});



module.exports = mongoose.model('Review', schema);