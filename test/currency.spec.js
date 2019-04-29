var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var supertest = require("supertest");
var should = require("should");

var Currency = require('../controllers/currency-api');

var server = supertest.agent("http://127.0.0.1:3000");
// Configure chai
//chai.use(require('sinon'));
chai.use(chaiHttp);
chai.should();






describe('Currency',function () {
    describe('API',function () {

        it('should accept two arguments', function() {
            expect(Currency.currency.length).to.equal(2);
        });
        it('should respond withs object', function() {
            expect(Currency.currency.res).should.be.a('Object')
        });

        });

});


