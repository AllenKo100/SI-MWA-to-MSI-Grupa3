const db = require("./db");
const server = require("./app");

describe('post - errorLog 200', function(done){

    it("treba reagirati na error 200", function(done){

        server
        .post('/errorLog')
        .send({code: 1, message: 'Database error', deviceUid: 1, errorTime:'10.03.2021'})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            done();
        });
    });
});

describe('post - errorLog 401', function(done){

    it("treba reagirati na error 401", function(done){

        server
        .post('/errorLog')
        .send({code: 1, message: 'Database error', deviceUid: 1, errorTime:'10.03.2021'})
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err,res){
            res.status.should.equal(401);
            done();
        });
    });
});

describe('post - errorLog 402', function(done){

    it("treba reagirati na error 402", function(done){

        server
        .post('/errorLog')
        .send({code: 1, message: 'Database error', deviceUid: 1, errorTime:'10.03.2021'})
        .expect("Content-type",/json/)
        .expect(402)
        .end(function(err,res){
            res.status.should.equal(402);
            done();
        });
    });
});

describe('post - errorLog 403', function(done){

    it("treba reagirati na error 403", function(done){

        server
        .post('/errorLog')
        .send({code: 1, message: 'Database error', deviceUid: 1, errorTime:'10.03.2021'})
        .expect("Content-type",/json/)
        .expect(403)
        .end(function(err,res){
            res.status.should.equal(403);
            done();
        });
    });
});

/** testovi za errorAdd */

describe('post - errorAdd 401', function(done){

    it("treba reagirati na error 401", function(done){

        server
        .post('/errorLog')
        .send({code: 1, description: 'Database error', type: ''})
        .expect("Content-type",/json/)
        .expect(401)
        .end(function(err,res){
            res.status.should.equal(401);
            done();
        });
    });
});

describe('post - errorAdd 200', function(done){

    it("treba reagirati na error 200", function(done){

        server
        .post('/errorLog')
        .send({code: 1, description: 'Database error', type: ''})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            done();
        });
    });
});

/**testovi za liveStatus */

timeStamp, deviceUid, message, cpuUsage, ramUsage, hddUsage, gpuUsage

describe('post - errorAdd 200', function(done){

    it("treba reagirati na error 200", function(done){

        server
        .post('/errorLog')
        .send({timeStamp:'10.03.2021', deviceUid: 1, message: '', cpuUsage: 3, ramUsage: 4, hddUsage: 2, gpuUsage: 4})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            done();
        });
    });
});

timeStamp, deviceUid, message, cpuUsage, ramUsage, hddUsage, gpuUsage

describe('post - errorAdd 404', function(done){

    it("treba reagirati na error 404", function(done){

        server
        .post('/errorLog')
        .send({timeStamp:'10.03.2021', deviceUid: 1, message: '', cpuUsage: 3, ramUsage: 4, hddUsage: 2, gpuUsage: 4})
        .expect("Content-type",/json/)
        .expect(404)
        .end(function(err,res){
            res.status.should.equal(404);
            done();
        });
    });
});