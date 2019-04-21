var express = require('express');
var router = express.Router();

var categories = require('../controllers/categories');
var product = require('../controllers/product');
var checkout = require('../controllers/checkout');
var isLoggedIn = require('../config/auth').ensureAuthenticated;

router.get('/',categories.categories);

router.get('/add-to-cart/:id',product.addToCart);

router.get('/cart',product.cart);

router.get('/remove/:id',product.remove);

router.get('/reduce/:id',product.reduce);

router.get('/add-to-wishlist/:id',isLoggedIn,product.addToWishlist);

router.get('/wishlist',isLoggedIn,product.wishlist);

router.get('/removeWish/:id',isLoggedIn,product.removeWishlistItem);

router.post('/checkout',isLoggedIn,checkout.stripe);

router.get('/search',product.search);

module.exports = router;
