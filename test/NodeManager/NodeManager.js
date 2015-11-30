var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('agent broker test', function(){
    it('send and on agent heartbeat', function(done){
        var brokerPromise = BrokerFactory.create(open, {agent: true, nm: true});
        brokerPromise.then(function(broker){
            var agentBroker = broker.getAgent();
            var nodeManagerBroker = broker.getNodeManager();
            nodeManagerBroker.onHeartbeat(function(err, beatInfo){
                console.log(beatInfo);
            })
            agentBroker.heartbeat({beat: 'i am a agent heart beat'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })
})




