/**
 * express module
 * @var
 */
var express = require('express');


/**
 * Express router to mount user related functions on.
 * @type {object}
 * @var
 * @namespace categoriesRouter
 */
var router = express.Router();


var _         = require("underscore");

//Controllers
var categories = require('../controllers/categories');
var Category = require('../models/category');



/**
 * route which is responsible for display   categories.
 * @name get/categories~categoriesRouter
 * @function
 * @memberof module:routes/categories~categoriesRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:sex/:id',categories.subCategories);


/**
 * route which is responsible for display subcategories for womens products.
 * @name get/woman~categoriesRouter
 * @function
 * @memberof module:routes/categories~categoriesRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/Woman',function (req,res) {
    Category.findOne({'id':'womens'}, function (err,docs) {

        if(err) return console.log(err);

        res.render('category/womanCategory',{_     : _,title: "Woman", womensC: docs})
    });
});

module.exports = router;