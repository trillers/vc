var BrokerFactory = require('../index');
var open = require('amqplib').connect('amqp://localhost');
var brokerPromise = BrokerFactory.create(open);
brokerPromise.then(function(broker){
});


var agentBroker = broker.getAgent();
var agentManager = broker.getAgentManager();
var bot = broker.getBot();

agentBroker.heartbeat();

agentBroker.onHeartbeat(function(){});


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
