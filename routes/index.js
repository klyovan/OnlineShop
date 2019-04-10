var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _         = require("underscore");

var Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res, next) {
    Category.findOne({'id':'mens'}, function (err,docs1) {
        if(err) return console.log(err);

        Category.findOne({'id':'womens'}, function (err,docs2) {

            if(err) return console.log(err);
            res.render('index',{_     : _, title: docs1.page_title, mensC:docs1, womensC:docs2});
        });
    });

    });


router.get('/signup',function (req, res) {
  res.render('users/signup',{title: "SignUp"})
});
router.get('/signin',function (req, res) {
  res.render('users/signin',{title: "SignIn"})
});


router.get('/product-list',function (req, res) {
    res.render('partials/product-list',{title: "Product-list"})
});
router.get('/product/:id',function (req, res) {
    res.render('partials/product',{title: "Product"})
});


router.get('/category/Mens/:id',function (req, res) {
    var id = req.params.id;
    var catId;
    if (id === "Clothing"){
         catId = 0
    }
    else if (id === "Accessories"){
        catId = 1
    }
    Category.findOne({'id':'mens'}, function (err,docs) {

        if(err) return console.log(err);
        console.log(docs);
        res.render('partials/subcategories',{_     : _,title: "Subcategory", subCategory: docs,catId: catId})
    });

});

router.get('/category/Womens/:id',function (req, res) {
    var id = req.params.id;
    var catId;
    if (id === "Clothing"){
        catId = 0
    }
    else if (id === "Jewelry"){
        catId = 1
    }
    else if (id === "Accessories"){
        catId = 1
    }

    Category.findOne({'id':'womens'}, function (err,docs) {

        if(err) return console.log(err);
        console.log(docs);
        res.render('partials/subcategories',{_     : _,title: "Subcategory", subCategory: docs, catId:catId})
    });

});

// router.get('/test',function (req, res) {
//
//
//     Category.findOne({'id':'mens'}, function (err,docs) {
//
//         if(err) return console.log(err);
//         console.log(docs);
//         res.render('partials/test',{_     : _,title: "Subcategory", items: docs})
//     });
//
// });




module.exports = router;
