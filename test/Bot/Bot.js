var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('bot broker test', function(){
    var brokerPromise = BrokerFactory.create(open, {bot: true, nm: true});

    it('send start agent request', function(done){
        brokerPromise.then(function(broker){
            var botBroker = broker.getBot();
            var nodeManagerBroker = broker.getNodeManager();
            nodeManagerBroker.onAgentStart(function(err, startInfo){
                console.log(startInfo);
            })
            botBroker.agentStart({info: 'start agent'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })
})




