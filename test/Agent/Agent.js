var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('bot broker test', function(){
    it('send start agent request', function(done){
        var brokerPromise = BrokerFactory.create(open, {nm: true, agent: true});
        brokerPromise.then(function(broker){
            var agentBroker = broker.getAgent();
            var nodeManagerBroker = broker.getNodeManager();
            agentBroker.onStartAgent(function(err, startInfo){
                console.log(startInfo);
            })
            nodeManagerBroker.startAgent({info: 'nm start agent'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    });

    it('send agent status change request', function(done){
        var brokerPromise = BrokerFactory.create(open, {bot: true, agent: true});
        brokerPromise.then(function(broker){
            var botBroker = broker.getBot();
            var agentBroker = broker.getAgent();
            botBroker.onStatusChange(function(err, changeInfo){
                console.log(changeInfo);
            })
            agentBroker.statusChange({info: 'agent status change'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })
})



