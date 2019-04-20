var _         = require("underscore");

var Cart = require('../models/cart');

var Wishlist = require('../models/wishlist');

var Product = require ('../models/product');

var mailer = require('../misc/mailer');

module.exports.product  = function (req, res) {
    var id = req.params.id;

    Product.find({'id': id},function (err,docs) {
        if(err) return console.log(err);

        res.render('product/product',{_     : _, title: "Product", products: docs})
    });


};


/**
 * add item in cart object
 *
 */
module.exports.addToCart = function (req,res) {
     var productId = req.params.id;
     var cart = new Cart(req.session.cart ? req.session.cart : {  }); // ternary expression

    Product.findOne({'id' : productId},function (err, product) {
       if (err){
           return res.redirect('/');
           // res.flash('error_msg','Can not find users with this id')
       }
       cart.add(product,productId);
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/cart');

    });
};

/**
 * rendering cart view
 */
module.exports.cart = function (req,res) {
 if(!req.session.cart){
     return res.render('shopping-cart/cart',{title: "Cart",products: null})
 }
    var cart = new Cart(req.session.cart);
 res.render('shopping-cart/cart',{_     : _, title: "Cart", products: cart.generateArray(), totalPrice: cart.totalPrice})
};


/**
 * remove item from cart list
 */
module.exports.remove = function (req, res,next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId); //
    req.session.cart = cart;
    res.redirect('/cart');
};

/**
 * reduce the amount of  item by one
 */
module.exports.reduce = function (req, res,next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeOne(productId); //
    req.session.cart = cart;
    res.redirect('/cart');
};

module.exports.addToWishlist = function (req,res) {
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {  }); // ternary expression
    if(req.isAuthenticated()) {
        Product.findOne({'id': productId}, function (err, product) {
            if (err) {
                return res.redirect('/');
                // res.flash('error_msg','Can not find users with this id')
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
                else console.log(data);
            });
            console.log(req.session.wishlist);
            res.redirect('/wishlist');


        });
    }else {
        res.redirect('/users/profile');
    }
};

module.exports.wishlist = function (req,res) {
    if(req.isAuthenticated()) {
        if (!req.session.wishlist) {
            return res.render('wishlist/wishlist', {title: "Wishlist", products: null})
        }
        var wishlist = new Wishlist(req.session.wishlist);
        res.render('wishlist/wishlist', {_: _, title: "Wishlist", products: wishlist.generateArray()})
    }else res.redirect('/')
    };


module.exports.removeWishlistItem = function (req, res,next) {
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});

    wishlist.removeItem(productId); //
    req.session.wishlist = wishlist;
    res.redirect('/wishlist');
};