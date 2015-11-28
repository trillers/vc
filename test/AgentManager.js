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


///**
// * Created by henryleu on 11/27/15.
// */
//var Factory = require("./lib");
//var vc = Factory.newRabbitMQImpl(rabbitClient);
//var vaClient = vc.getVaClient();
//var vbClient = vc.getVbClient();
//
//vc.sendHeartBeat('');
//1000
//vc.on('heartbeat', function(){
//
//
//})
