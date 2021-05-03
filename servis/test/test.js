// const db = require("../db");
const app = require("../app");
const expect = require('chai').expect;
const chai = require('chai');
const mocha = require('mocha');
const { response } = require("express");
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();


//Testovi za /liveStatus
describe("LiveStatus", function() {
    it("status 200", function(done) {
        chai.request(app)
        .post("/liveStatus")
        .send({
            timeStamp:'2021-04-06 15:01:29.000000',
            deviceUid: 'fc548ecb-12ec-4ad5-8672-9d5a9565ff60',
            message: 'Im alive',
            cpuUsage: 0.5,
            ramUsage: 0.5,
            hddUsage: 0.5,
            gpuUsage: 0.5})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });

    it("Wrong deviceUid", function(done) {
        chai.request(app)
        .post("/liveStatus")
        .send({
            timeStamp:'2021-04-06 15:01:29.000000',
            deviceUid: '10',
            message: 'Im alive',
            cpuUsage: 0.5,
            ramUsage: 0.5,
            hddUsage: 0.5,
            gpuUsage: 0.5})
        .end((err,res) => {
            res.should.have.status(404);
            res.body.should.have.property('message');
            done();
        })
    });

    it("Wrong timeStamp", function(done) {
        var poruka = "Couldn't find device";
        chai.request(app)
        .post("/liveStatus")
        .send({
            timeStamp:'.',
            deviceUid: 'fc548ecb-12ec-4ad5-8672-9d5a9565ff60',
            message: 'Im alive',
            cpuUsage: 0.5,
            ramUsage: 0.5,
            hddUsage: 0.5,
            gpuUsage: 0.5})
        .end((err,res) => {
            res.should.have.status(404);
            res.body.should.have.property('message');
            done();
        })
    });

    it("Null statistic", function(done) {
        var poruka = "Couldn't find device";
        chai.request(app)
        .post("/liveStatus")
        .send({
            timeStamp:'2021-05-04 21:34:15.000000',
            deviceUid: 'fc548ecb-12ec-4ad5-8672-9d5a9565ff60',
            message: 'Im alive',
            cpuUsage: null,
            ramUsage: null,
            hddUsage: null,
            gpuUsage: null})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });
});

//Testovi za /errorLog

describe("ErrorLog", function() {
    it("status 200", function(done) {
        chai.request(app)
        .post("/errorLog")
        .send({
            code: 1,
            message: 'Error',
            deviceUid: 'fc548ecb-12ec-4ad5-8672-9d5a9565ff60',
            errorTime:'2021-04-06 15:01:29.000000'})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });

    it("Wrong deviceUid", function(done) {
        chai.request(app)
        .post("/errorLog")
        .send({
            code: 1,
            message: 'Error',
            deviceUid: '10',
            errorTime:'2021-04-06 15:01:29.000000'})
        .end((err,res) => {
            res.should.have.status(402);
            res.body.should.have.property('message');
            done();
        })
    });
});

//Testovi za errorAdd

describe("ErrorAdd", function() {
    it("status 200", function(done) {
        chai.request(app)
        .post("/errorAdd")
        .send({
            code: 417,
            description: 'Expectation failed',
            type: 'YELLOW'})
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });

    it("status 401", function(done) {
        chai.request(app)
        .post("/errorAdd")
        .send({
            code: 401,
            description: 'Expectation failed',
            type: 'YELLOW'})
        .end((err,res) => {
            res.should.have.status(401);
            res.body.should.have.property('message');
            done();
        })
    });
});

