var BrokerFactory = require('vc');
var broker = BrokerFactory.create(mq, options);
var agent = broker.getAgent();
var agentManager = broker.getAgentManager();
var bot = broker.getBot();






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
