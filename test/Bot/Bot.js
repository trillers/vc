var BrokerFactory = require('../../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe('bot broker test', function(){
    it('send start agent request', function(done){
        var brokerPromise = BrokerFactory.create(open, {nm: true, bot: true});
        brokerPromise.then(function(broker){
            var botBroker = broker.getBot();
            var nodeManagerBroker = broker.getNodeManager();
            nodeManagerBroker.onStartAgent(function(err, startInfo){
                console.log(startInfo);
            })
            botBroker.startAgent({info: 'start agent'});
            setTimeout(function(){
                done();
            }, 3000);
        });
    })
})




