const assert = require("chai").assert;
const sinon  = require("sinon");
const request= require("request");

const request1 = require("../index");
const request2 = require("../index").init({meta:"someMeta"});


describe("REQUEST-INTERCEPT-GET", function() {
    var uri         = "http://localhost:3000";
    var spyGet      = sinon.stub(request, 'get');
    beforeEach(done => {
        spyGet
            .yields(null, {statusCode:200}, JSON.stringify({message: "Completed"}));
        done();
    });

    it("should return with header reqId as NA", function() {
        let expected = { headers: { reqId: "NA" }, uri: uri };
        request1.get({ uri: uri }, function (error, response, body) {

        });

        sinon.assert.calledWith(spyGet ,expected);
    });

    it("sho`uld return with header meta as someMeta", function() {

        let expected = { headers: {meta:"someMeta"}, uri: uri };
        request2.get({uri: uri},function (error, response, body) {

        });

        sinon.assert.calledWith(spyGet,expected);
    });

    it("should return with header meta as someMeta as well as reqId as NA", function() {

        let expected = { headers: {meta:"someMeta", reqId:"NA"}, uri: uri };
        request1.get({uri:uri,headers: {meta:"someMeta"}},function (error, response, body) {

        });

        sinon.assert.calledWith(spyGet,expected);
    });
});