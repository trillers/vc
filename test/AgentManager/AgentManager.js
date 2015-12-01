var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('agent manager broker test', function(){
    var brokerPromise = BrokerFactory.create(open, {am: true, nm: true});

    it('send and on agent manager heartbeat', function(done){
        brokerPromise.then(function(broker){
            var agentManagerBroker = broker.getAgentManager();
            var nodeManagerBroker = broker.getNodeManager();
            nodeManagerBroker.onAgentManagerHeartbeat(function(err, beatInfo){
                console.log(beatInfo);
            })
            agentManagerBroker.heartbeat({beat: 'i am a agent manager heart beat'});

            setTimeout(function(){
                done();
            }, 3000);
        });
    })

    it('on node manager status request', function(done){
        brokerPromise.then(function(broker){
            var agentManagerBroker = broker.getAgentManager();
            var nodeManagerBroker = broker.getNodeManager();
            agentManagerBroker.onStatusRequest(function(err, startInfo){
                console.log(startInfo);
            })
            nodeManagerBroker.agentManagerStatusRequest({info: 'nm request agent manager status'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

    it('send agent manager status change request', function(done){
        brokerPromise.then(function(broker){
            var nodeManagerBroker = broker.getNodeManager();
            var agentMangerBroker = broker.getAgentManager();
            nodeManagerBroker.onAgentManagerStatusChange(function(err, changeInfo){
                console.log(changeInfo);
            })
            agentMangerBroker.statusChange({info: 'agent manager status change'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

})




