//var VCR = require('../index');
//var pubClient = require('../lib/dep/redis-client')('pub');
//var subClient = require('../lib/dep/redis-client')('sub');
//var vcr = new VCR(pubClient, subClient);
//var assert = require('chai').assert;
//
//describe('vcr', function(done){
//    describe('#heartBeatRequest', function(){
//        var mock = {};
//        var expect = {
//            bid: 'test',
//            status: 'running'
//        };
//        it('#heartBeatRequest', function(done){
//            vcr.heartBeatRequest('test', function(json){
//                console.log('wechat box id is ' + json.bid);
//                console.log('wechat box status is ' + json.status);
//                mock.bid = json.bid;
//                mock.status = json.status;
//            })
//        });
//        after(function(done){
//            vcr.heartBeatResponse({
//                bid: expect.bid,
//                status: expect.status
//            });
//            setTimeout(function(){
//                assert.equal(mock.bid, expect.bid);
//                assert.equal(mock.status, expect.status);
//                done();
//            }, 2000)
//        })
//    })
//});