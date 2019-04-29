var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var supertest = require('supertest');
var should = require('should');

var Categories = require('../controllers/categories');

var server = supertest.agent("http://127.0.0.1:3000");
// Configure chai
//chai.use(require('sinon'));
chai.use(chaiHttp);
chai.should();



//Results
categories = Categories.categories();



describe('Categories',function () {
    describe('categoires',function () {

        it('should accept two arguments', function() {
            expect(Categories.categories.length).to.equal(2);
        });

        it("should return categories page",function(done){

            // calling subcategory page
            server
                .get("/")
                .expect("Content-type",/render/)
                .expect(200) // THis is HTTP response
                .end(function(err,res){
                    // Error key should be false.
                    expect(Categories.categories.res).should.be.a('Object');
                    done();
                });
        });
        });




    describe('subCategoires',function () {


        it('should accept two arguments', function() {
            expect(Categories.categories.length).to.equal(2);
        });

        it("should return subCategories page",function(done){

            // calling subcategory page
            server
                .get("/category/Mens/Clothing")
                .expect("Content-type",/render/)
                .expect(200) // THis is HTTP response
                .end(function(err,res){
                    // Error key should be false.
                    expect(Categories.subCategories.res).should.be.a('Object');
                    done();
                });
        });

    })
    });


