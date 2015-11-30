var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('agent broker test', function(){
    var brokerPromise = BrokerFactory.create(open, {am: true, bot: true, nm: true, agent: true});

    it('send start agent request', function(done){
        brokerPromise.then(function(broker){
            var agentBroker = broker.getAgent();
            var nodeManagerBroker = broker.getNodeManager();
            agentBroker.onStartRequest(function(err, startInfo){
                console.log(startInfo);
            })
            nodeManagerBroker.startRequest({info: 'nm start agent'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    });

    it('send agent status change request', function(done){
        brokerPromise.then(function(broker){
            var nodeManagerBroker = broker.getNodeManager();
            var agentBroker = broker.getAgent();
            nodeManagerBroker.onAgentStatusChange(function(err, changeInfo){
                console.log(changeInfo);
            })
            agentBroker.statusChange({info: 'agent status change'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

    it('on node manager status request', function(done){
        brokerPromise.then(function(broker){
            var agentBroker = broker.getAgent();
            var nodeManagerBroker = broker.getNodeManager();
            agentBroker.onStatusRequest(function(err, startInfo){
                console.log(startInfo);
            })
            nodeManagerBroker.agentStatusRequest({info: 'nm request agent status'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

    it('agent profile response', function(done){
        brokerPromise.then(function(broker){
            var nodeManagerBroker = broker.getNodeManager();
            var agentBroker = broker.getAgent();
            nodeManagerBroker.onProfileResponse(function(err, changeInfo){
                console.log(changeInfo);
            })
            agentBroker.profileResponse({info: 'agent profile'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })

})



