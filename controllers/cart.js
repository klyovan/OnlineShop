var _         = require("underscore");



var Cart = require('../models/cart');
var Product = require ('../models/product');


/**
 * @module cart
 */

/**
 * Middleware which is responsible for adding product in a cart.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.addToCart = function (req,res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {  }); // ternary expression

    Product.findOne({'id' : productId},function (err, product) {
        if (err){
            return res.redirect('/');
        }
        cart.add(product,productId);
        req.session.cart = cart;
        res.redirect('/cart');

    });
};


/**
 * Middleware which is responsible for rendering cart view and pass data to appropriate template .
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */

module.exports.cart = function (req,res) {
    if(!req.session.cart){
        return res.render('shopping-cart/cart',{title: "Cart",products: null})
    }
    var cart = new Cart(req.session.cart);


    res.render('shopping-cart/cart',{_     : _, title: "Cart", products: cart.generateArray(), totalPrice: cart.totalPrice})
};



/**
 * Middleware which is responsible for removing product from cart.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.removeCartItem = function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
};

/**
 * Middleware which is responsible for reducing the amount of products, that is in the cart, by one .
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.reduceCartItem = function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeOne(productId); //
    req.session.cart = cart;
    res.redirect('/cart');
};