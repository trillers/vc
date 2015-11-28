var BrokerFactory = require('../index');
var rabbitmq = require('base-settings').rabbitmq;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);
var brokerPromise = BrokerFactory.create(open);
brokerPromise.then(function(broker){
    console.log(broker);
});



//var agentBroker = broker.getAgent();
//var agentManager = broker.getAgentManager();
//var bot = broker.getBot();
//
//agentBroker.heartbeat();
//
//agentBroker.onHeartbeat(function(){});


