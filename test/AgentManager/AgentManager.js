var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('agent manager broker test', function(){
    it('send and on agent manager heartbeat', function(done){
        var brokerPromise = BrokerFactory.create(open);
        brokerPromise.then(function(broker){
            var agentManagerBroker = broker.getAgentManager();
            agentManagerBroker.onHeartBeat(function(err, beatInfo){
                console.log(beatInfo);
            })
            agentManagerBroker.heartBeat({beat: 'i am a agent manager heart beat'});
            setTimeout(function(){
                done();
            }, 2000);
        });
    })
})




