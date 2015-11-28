var BotBroker = require('./BotBroker');
var AgentBroker = require('./AgentBroker');
var AgentManagerBroker = require('./AgentManagerBroker');
var NodeManagerBroker = require('./NodeManagerBroker');

var Broker = function(producerChannel, consumerChannel){
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
    this.init();
};
Broker.prototype.init = function(){
    this.bot = new BotBroker(this.producerChannel, this.consumerChannel);
    this.agent = new AgentBroker(this.producerChannel, this.consumerChannel);
    this.agentManager = new AgentManagerBroker(this.producerChannel, this.consumerChannel);
    this.nodeManager = new NodeManagerBroker(this.producerChannel, this.consumerChannel);
};

Broker.prototype.getBot = function(){
    return this.bot;
};
Broker.prototype.getAgent = function(){
    return this.agent;
};
Broker.prototype.getAgentManager = function(){
    return this.agentManager;
};
Broker.prototype.getNodeManager = function(){
    return this.nodeManager;
};

module.exports = Broker;