var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');

var Checkout = require('../controllers/checkout');

// Configure chai
chai.use(chaiHttp);
chai.should();






    describe('Checkout',function () {

        it('should accept two arguments', function() {
            expect(Checkout.stripe.length).to.equal(2);
        });
    });


