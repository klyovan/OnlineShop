/**
 * express module
 * @var
 */
var express = require('express');


/**
 * Express router to mount user related functions on.
 * @type {object}
 * @var
 * @namespace IndexRouter
 */
var router = express.Router();


//Controllers
var categories = require('../controllers/categories');
var product = require('../controllers/product');
var checkout = require('../controllers/checkout');
var cart = require('../controllers/cart');
var wishlist = require('../controllers/wishlist');

//check if user logged in
var isLoggedIn = require('../config/auth').ensureAuthenticated;

/**
 * route which is responsible for display of  categories.
 * @name get/index~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/',categories.categories);

/**
 * route which is responsible for adding product to the cart.
 * @name get/addToCart~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/add-to-cart/:id',cart.addToCart);


/**
 * route which is responsible for displaying cart.
 * @name get/cart~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/cart',cart.cart);


/**
 * route which is responsible for removing item from the cart.
 * @name get/removeCartItem~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/remove/:id',cart.removeCartItem);


/**
 * route which is responsible for reducing items quantity by one.
 * @name get/reduceCartItem~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/reduce/:id',cart.reduceCartItem);


/**
 * route which is responsible for adding item to wishlist.
 * @name get/addToWishlist~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/add-to-wishlist/:id',isLoggedIn,wishlist.addToWishlist);


/**
 * route which is responsible for displaying of wishlist.
 * @name get/wishlist~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/wishlist',isLoggedIn,wishlist.wishlist);


/**
 * route which is responsible for removing item from wishlist.
 * @name get/removeWishlistItem~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/removeWish/:id',isLoggedIn,wishlist.removeWishlistItem);


/**
 * route which is responsible for checkout with stripe.
 * @name get/stripe~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/checkout',isLoggedIn,checkout.stripe);


/**
 * route which is responsible for searching products.
 * @name get/search~IndexRouter
 * @function
 * @memberof module:routes/index~IndexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/search',product.search);

module.exports = router;
