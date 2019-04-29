
var request = require('request');

/**
 * @module currency-api
 */


/**
 * Middleware which is responsible for Rest API integration what change currency using api from https://free.currencyconverterapi.com.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.currency = function (req,res) {
    var q = req.body.currency;
    var price = req.query.q;


    request('https://free.currencyconverterapi.com/api/v6/convert?q=USD_'+ q +'&compact=ultra&apiKey=b665d88824a21a68646f',function (err,response,body) {
        var currency = JSON.parse(body);
        var value = Object.values(currency)[0];

        res.send({value,price});
    });

};