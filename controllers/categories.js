var _         = require("underscore");


var Category = require('../models/category');


/**
 * @module categories
 */

/**
 * Middleware which is responsible for rendering main categories page and pass data to appropriate template .
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.categories = function(req, res) {
    Category.findOne({'id':'mens'}, function (err,docs1) {
        if(err) return console.log(err);

        Category.findOne({'id':'womens'}, function (err,docs2) {
            if(err) return console.log(err);

            res.render('index',{_     : _, title: docs1.page_title, mensC:docs1, womensC:docs2});
        });
    });
};

/**
 * Middleware which is responsible for rendering subcategories page and pass data to appropriate template .
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.subCategories = function (req, res) {
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


            res.render('category/subcategories',{_     : _,title: "Subcategory", subCategory: docs,catId: catId})
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

            res.render('category/subcategories',{_     : _,title: "Subcategory", subCategory: docs, catId:catId})
        });

    }
};