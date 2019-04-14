var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _         = require("underscore");
var url = require('url');
var request = require('request');

var Category = require('../models/category');
var Product = require ('../models/product');


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


router.get('/category/:gender/:subC_Name/:prodListName',function (req, res) {
    var mainC = req.params.gender;
    var subcC = req.params.subC_Name;
    var listName = req.params.prodListName;

    Product.find({'primary_category_id': listName},function (err,docs) {
        if(err) return console.log(err);

        res.render('partials/product-list',{_     : _ ,title: "Product-list", products: docs,mainC: mainC, subC: subcC});
    });

});

router.get('/category/:gender/:subC_Name/product/:id',function (req, res) {
    var id = req.params.id;

    Product.find({'id': id},function (err,docs) {
        if(err) return console.log(err);

        res.render('partials/product',{_     : _, title: "Product", products: docs})
    });


});

router.post('/test/currency',function (req,res) {
    var q = req.body.currency;
    var price = req.query.q;




    request('https://free.currencyconverterapi.com/api/v6/convert?q=USD_'+ q +'&compact=ultra&apiKey=b665d88824a21a68646f',function (err,response,body) {
        var currency = JSON.parse(body);
        var value = Object.values(currency)[0];


       // console.log("lol");

        res.send({value,price});
    });

});


router.get('/category/:sex/:id',function (req, res) {
    var id = req.params.id;
    var sex = req.params.sex;
    var catId;
    if (sex === "Mens"){
        switch (id) {
            case id = "Clothing":
                catId = 0;
                break;
            case id = "Accessories":
                catId = 1;
                break;
        }

        Category.findOne({'id':'mens'}, function (err,docs) {

            if(err) return console.log(err);


            res.render('partials/subcategories',{_     : _,title: "Subcategory", subCategory: docs,catId: catId})
        });
    }
    else if (sex === "Womens"){
        switch (id) {
            case id = "Clothing":
                catId = 0;
                break;
            case id = "Jewelry":
                catId = 1;
                break;
            case id = "Accessories":
                catId = 2;
                break;

        }

        Category.findOne({'id':'womens'}, function (err,docs) {

            if(err) return console.log(err);

            res.render('partials/subcategories',{_     : _,title: "Subcategory", subCategory: docs, catId:catId})
        });

    }
});




// router.get('/test/:id/:ruka',function (req, res) {
//
//     var firstId = req.params.id;
//     var secondId = req.params.ruka;
//
//     console.log(firstId,);
//     console.log(secondId);
//
//     res.render('partials/test',{_     : _});
//     // _     : _ ,title: "Product-list", items: docs
//
// });




module.exports = router;
