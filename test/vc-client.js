var assert = require('chai').assert;
var BrokerFactory = require('..');
var amqp = require('amqplib');
var settings = require('../vc-settings');

describe('vc-client test', function () {
    var open = null;
    before(function (done) {
        var rbqUri = 'amqp://' + settings.rabbitmq.username + ':' + settings.rabbitmq.password + '@' + settings.rabbitmq.host + ':' + settings.rabbitmq.port + '/' + settings.rabbitmq.vhost;
        open = amqp.connect(rbqUri);
        done();
    });

    it('create broker', function(done){
        var brokerPromise = BrokerFactory.create(open);
        brokerPromise.then(function(broker){
            console.log(broker);
            done();
        });
    });
    //it('sbot manager heart beat', function (done) {
    //    var vc = factory.vcRabbitMQComplete(client);
    //    vc.onManagerHeartBeat(function (err, beatInfo) {
    //        console.log('1');
    //        console.log(beatInfo);
    //    });
    //    vc.onManagerHeartBeat(function (err, beatInfo) {
    //        console.log('2');
    //        console.log(beatInfo);
    //    });
    //    vc.sendManagerHeartBeat({bid: 'ddd', status: 'running'});
    //    vc.sendManagerHeartBeat({bid: 'sss', status: 'died'});
    //    vc.sendManagerHeartBeat('test invalid heart beat info');
    //
    //    setTimeout(function(){
    //        done();
    //    }, 2000);
    //});
    //
    //it('sbot agent heart beat', function (done) {
    //    var vc = factory.vcRabbitMQComplete(client);
    //    vc.onAgentHeartBeat(function (err, beatInfo) {
    //        console.log('1');
    //        console.log(beatInfo);
    //    });
    //    vc.onAgentHeartBeat(function (err, beatInfo) {
    //        console.log('2');
    //        console.log(beatInfo);
    //    });
    //    vc.sendAgentHeartBeat({bid: 'ddd', status: 'running'});
    //    vc.sendAgentHeartBeat({bid: 'sss', status: 'died'});
    //    vc.sendAgentHeartBeat('test invalid heart beat info');
    //
    //    setTimeout(function(){
    //        done();
    //    }, 2000);
    //});
});


