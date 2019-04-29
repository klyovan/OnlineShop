
var stripe = require("stripe")(
    "sk_test_n4mXFQ1xun1h5Wb4fxDOWrMQ00GnmEC5UX");

//model
var Order = require('../models/order');


/**
 * @module checkout
 */

/**
 * Middleware which is responsible for payment using Stripe.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object

 * @return {undefined}
 */
module.exports.stripe = function (req,res) {
    var cart = req.session.cart.totalPrice;
    stripe.charges.create({
        amount: cart *100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err){
            console.log('Error: Stripe');
        }
        else {
            var order = new Order({
                user: req.user, //passport allow
                cart: req.session.cart,
                email:req.user.email,
                paymentId: charge.id
            });
            order.save(function (err, result) {
                if(err){
                    console.log(err);
                }

                req.session.cart = null;
                res.redirect('/')

            });


        }
    })

};