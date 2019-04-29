var _         = require("underscore");



//Models
var Product = require ('../models/product');
var Review = require ('../models/review');
var ViewedProducts = require ('../models/viewedProducts');



/**
 * @module product
 */


/**
 * Middleware which is responsible for rendering product describe page and add data in ViewedProducts object and pass array of viewedProducts on PDP page.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.product  = function (req, res) {
    var id = req.params.id;

    var viewedProducts = new ViewedProducts(req.session.viewedProducts ? req.session.viewedProducts : {  });


    Product.find({'id': id},function (err,docs) {
        if(err) return console.log(err);

        viewedProducts.add(docs,id);

         req.session.viewedProducts = viewedProducts;

         Review.find({'productId':id},function (err,reviews) {
             if(err) return console.log(err);

             res.render('product/product',{_     : _, title: "Product", products: docs, viewed: viewedProducts.generateArray(),reviews: reviews, breadcrumbs: req.breadcrumbs})

         });

    });

};



/**
 * Middleware which is responsible for searching products using RegExp .
 * @function
 * @requires escapeRegex
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.search = function (req, res) {
    if (req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Product.find({ "name": regex }, function(err, foundproducts) {
            if(err) {
                console.log(err);
            } else {
                res.render("product/search-result", {_: _,title: 'Search results', products: foundproducts });
            }
        });
    }


};

/**
 * This function escape Regex, runs replace on text param
 * @param text
 * @returns regex
 *
 */
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



/**
 * Middleware which is responsible for serving review form.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.postReview = function (req,res) {
    var {selected_rating, name, comment, idp} = req.body;


    var newReview = new Review({
        reviewer: name,
        stars: selected_rating,
        reviewText: comment,
        productId: idp

    });


        if (comment.length <4){
             req.flash('error_msg','Review must contain at least 4 characters !');
            res.redirect('/product/product/' + idp);
        }else if(selected_rating === ''){
            req.flash('error_msg','Rate it on a scale of 5 stars, when add new review!');
            res.redirect('/product/product/' + idp);
        } else {

            newReview.save();
            res.redirect('/product/product/' + idp);
        }

};