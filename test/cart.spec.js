var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var supertest = require("supertest");
var should = require("should");

var Cart = require('../controllers/cart');

var server = supertest.agent("http://127.0.0.1:3000");
// Configure chai
//chai.use(require('sinon'));
chai.use(chaiHttp);
chai.should();


    describe('Cart',function () {

        it('should accept two arguments', function() {
            expect(Cart.cart.length).to.equal(2);
        });
        it("should return cart page",function(done){

            // calling home page api
            server
                .get("/cart")
                .expect("Content-type",/render/)
                .expect(200) // THis is HTTP response
                .end(function(err,res){
                    // Error key should be false.
                    expect(Cart.cart.res).should.be.a('Object');
                    done();
                });
        });
    });



