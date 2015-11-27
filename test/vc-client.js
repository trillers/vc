var assert = require('chai').assert;
var factory = require('../index')();
var amqp = require('amqplib/callback_api');
var settings = require('../vc-settings');

describe('vc-client test', function () {
    var client = null;
    before(function (done) {
        var rbqUri = 'amqp://' + settings.rabbitmq.username + ':' + settings.rabbitmq.password + '@' + settings.rabbitmq.host + ':' + settings.rabbitmq.port + '/' + settings.rabbitmq.vhost;
        amqp.connect(rbqUri, function (err, conn) {
            assert.notOk(err);
            client = conn;
            done();
        });
    });
    it('sbot manager heart beat', function (done) {
        var vc = factory.vcRabbitMQComplete(client);
        vc.onManagerHeartBeat(function (err, beatInfo) {
            console.log('1');
            console.log(beatInfo);
        });
        vc.onManagerHeartBeat(function (err, beatInfo) {
            console.log('2');
            console.log(beatInfo);
        });
        vc.sendManagerHeartBeat({bid: 'ddd', status: 'running'});
        vc.sendManagerHeartBeat({bid: 'sss', status: 'died'});
        vc.sendManagerHeartBeat('test invalid heart beat info');

        setTimeout(function(){
            done();
        }, 2000);
    });

    it('sbot agent heart beat', function (done) {
        var vc = factory.vcRabbitMQComplete(client);
        vc.onAgentHeartBeat(function (err, beatInfo) {
            console.log('1');
            console.log(beatInfo);
        });
        vc.onAgentHeartBeat(function (err, beatInfo) {
            console.log('2');
            console.log(beatInfo);
        });
        vc.sendAgentHeartBeat({bid: 'ddd', status: 'running'});
        vc.sendAgentHeartBeat({bid: 'sss', status: 'died'});
        vc.sendAgentHeartBeat('test invalid heart beat info');

        setTimeout(function(){
            done();
        }, 2000);
    });
});


