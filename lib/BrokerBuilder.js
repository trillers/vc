var Broker = require('./Broker');

var BrokerBuilder = function(){
    this.producerChannel = null;
    this.consumerChannel = null;
};

BrokerBuilder.create = function(){
    return new BrokerBuilder();
};

BrokerBuilder.prototype.setProducerChannel = function(ch){
    this.producerChannel = ch;
    return this;
};

BrokerBuilder.prototype.setConsumerChannel = function(ch){
    this.consumerChannel = ch;
    return this;
};

BrokerBuilder.prototype.build = function(){
    return new Broker(this.producerChannel, this.consumerChannel);
};

module.exports = BrokerBuilder;