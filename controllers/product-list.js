var _         = require("underscore");

var Product = require ('../models/product');


/**
 * @module product-list
 */

/**
 * Middleware which is responsible for rendering product list page.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.product_list = function (req, res) {
    var mainC = req.params.gender;
    var subcC = req.params.subC_Name;
    var listName = req.params.prodListName;

    Product.find({'primary_category_id': listName},function (err,docs) {
        if(err) return console.log(err);

        res.render('product/product-list',{_     : _ ,title: "Product-list", products: docs,mainC: mainC, subC: subcC, breadcrumbs: req.breadcrumbs});
    });

};