var express = require('express');
var router = express.Router();


var categories = require('../controllers/categories');

router.get('/:sex/:id',categories.subCategories);

module.exports = router;