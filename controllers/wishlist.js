var mailer = require('../misc/mailer');
var _         = require("underscore");

//Models
var Wishlist = require('../models/wishlist');
var Product = require ('../models/product');


/**
 * @module wishlist
 */



/**
 * Middleware which is responsible for adding product in a wishlist and informs him about it using mail.
 * @function
 * @requires mailer,Product,Wishlist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.addToWishlist = function (req,res) {
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {  }); // ternary expression

    Product.findOne({'id': productId}, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        wishlist.add(product, productId);
        req.session.wishlist = wishlist;

        //compose email
        var html = 'Hi there,<br>' +
            'You add ' + product.name + ' to your wishlist.' +
            '<br> Have a nice day :)';
        //send email
        var mailOptions = {
            from: 'OSF-Support ',
            to: 'klyovan88@gmail.com', //TODO change on req.body.email
            subject: 'You added item to wishlist',
            html: html
        };
        mailer.sendMail(mailOptions, function (err, data) {
            if (err) console.log(err);
        });
        res.redirect('/wishlist');


    });
};


/**
 * Middleware which is responsible for rendering wishlist page.
 * @function
 * @requires Wishlist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.wishlist = function (req,res) {

    if (!req.session.wishlist) {
        return res.render('wishlist/wishlist', {title: "Wishlist", products: null})
    }
    var wishlist = new Wishlist(req.session.wishlist);
    res.render('wishlist/wishlist', {_     : _, title: "Wishlist", products: wishlist.generateArray()})

};



/**
 * Middleware which is responsible for removing product from wishlist.
 * @function
 * @requires Wishlist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.removeWishlistItem = function (req, res) {
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});

    wishlist.removeItem(productId); //
    req.session.wishlist = wishlist;
    res.redirect('/wishlist');
};