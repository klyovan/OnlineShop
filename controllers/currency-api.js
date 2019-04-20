var _         = require("underscore");


var request = require('request');

module.exports.currency = function (req,res) {
    var q = req.body.currency;
    var price = req.query.q;



    request('https://free.currencyconverterapi.com/api/v6/convert?q=USD_'+ q +'&compact=ultra&apiKey=b665d88824a21a68646f',function (err,response,body) {
        var currency = JSON.parse(body);
        var value = Object.values(currency)[0];


        // console.log("lol");

        res.send({value,price});
    });

}