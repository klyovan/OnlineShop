var express = require('express');
var router = express.Router();
var _         = require("underscore");


var categories = require('../controllers/categories');
var Category = require('../models/category');

router.get('/:sex/:id',categories.subCategories);

router.get('/Woman',function (req,res) {
    Category.findOne({'id':'womens'}, function (err,docs) {

        if(err) return console.log(err);

        res.render('category/womanCategory',{_     : _,title: "Woman", womensC: docs})
    });
});

module.exports = router;