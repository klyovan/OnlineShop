var _         = require("underscore");

var Product = require ('../models/product');

module.exports.product_list = function (req, res) {
    var mainC = req.params.gender;
    var subcC = req.params.subC_Name;
    var listName = req.params.prodListName;

    Product.find({'primary_category_id': listName},function (err,docs) {
        if(err) return console.log(err);

        res.render('product/product-list',{_     : _ ,title: "Product-list", products: docs,mainC: mainC, subC: subcC});
    });

};