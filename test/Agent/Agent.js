var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('agent broker test', function(){
    it('send and on agent heartbeat', function(done){
        var brokerPromise = BrokerFactory.create(open);
        brokerPromise.then(function(broker){
            var agentBroker = broker.getAgent();
            var botBroker = broker.getBot();
            botBroker.onHeartBeat(function(err, beatInfo){
                console.log(beatInfo);
            })
            agentBroker.heartBeat({beat: 'i am a agent heart beat'});
            setTimeout(function(){
                done();
            }, 2000);
        });
    })
})




