var Broker = function(producerChannel, consumerChannel){
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
    this.bot = null;
    this.agent = null;
    this.agentManager = null;
    this.init();
};
Broker.prototype.init = function(){
    //TODO
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

module.exports = Broker;