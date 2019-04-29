var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var supertest = require("supertest");
var should = require("should");

var Product = require('../controllers/product');
var ProductList = require('../controllers/product-list');

var server = supertest.agent("http://127.0.0.1:3000");
// Configure chai
//chai.use(require('sinon'));
chai.use(chaiHttp);
chai.should();


describe('Product',function () {
    describe('product',function () {

        it('should accept two arguments', function () {
            expect(Product.product.length).to.equal(2);
        });
        it("should return PDP page", function (done) {

            // calling home page api
            server
                .get("/product/product/25686571")
                .expect("Content-type", /render/)
                .expect(200) // THis is HTTP response
                .end(function (err, res) {
                    // Error key should be false.
                    expect(Product.product.res).should.be.a('Object');
                    done();
                });
        });
    });
    describe('product-list',function(){

        it('should accept two arguments', function () {
            expect(ProductList.product_list.length).to.equal(2);
        });
        it("should return product-list page",function(done){

            // calling home page api
            server
                .get("/product/mens-clothing-suite")
                .expect(200) // THis is HTTP response
                .end(function(err,res){
                    // Error key should be false.
                    expect(ProductList.product_list.res).should.be.a('Object');
                    done();
                });
        });


    });

});


