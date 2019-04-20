var express = require('express');
var router = express.Router();

var categories = require('../controllers/categories');
var product = require('../controllers/product');


router.get('/',categories.categories);

router.get('/add-to-cart/:id',product.addToCart);

router.get('/cart',product.cart);

router.get('/remove/:id',product.remove);

router.get('/reduce/:id',product.reduce);

router.get('/add-to-wishlist/:id',product.addToWishlist);

router.get('/wishlist',product.wishlist);

router.get('/removeWish/:id',product.removeWishlistItem);

module.exports = router;
