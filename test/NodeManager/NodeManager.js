var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('node manager test', function(){
    var brokerPromise = BrokerFactory.create(open, {agent: true, nm: true, am: true});

    it('success send and on agent heartbeat', function(done){
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

    it('success on agent status response', function(done){
        brokerPromise.then(function(broker){
            var agentBroker = broker.getAgent();
            var nodeManagerBroker = broker.getNodeManager();
            nodeManagerBroker.onAgentStatus(function(err, statusInfo){
                console.log(statusInfo);
            })
            agentBroker.statusResponse({beat: 'i am a agent status'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

    it('success on agent manager status response', function(done){
        brokerPromise.then(function(broker){
            var agentManagerBroker = broker.getAgentManager();
            var nodeManagerBroker = broker.getNodeManager();
            nodeManagerBroker.onAgentManagerStatus(function(err, statusInfo){
                console.log(statusInfo);
            })
            agentManagerBroker.statusResponse({beat: 'i am a agent manager status'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

})



