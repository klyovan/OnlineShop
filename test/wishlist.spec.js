var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var supertest = require("supertest");
var should = require("should");

var Wishlist = require('../controllers/wishlist');

var server = supertest.agent("http://127.0.0.1:3000");
// Configure chai
//chai.use(require('sinon'));
chai.use(chaiHttp);
chai.should();


describe('Wishlist',function () {

    it('should accept two arguments', function() {
        expect(Wishlist.wishlist.length).to.equal(2);
    });
    it("should return wishlist page",function(done){

        // calling home page api
        server
            .get("/wishlist")
            .expect("Content-type",/render/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // Error key should be false.
                expect(Wishlist.wishlist.res).should.be.a('Object');
                done();
            });
    });
});



