var util = require('util');
var EventEmitter = require('events').EventEmitter;

var AgentManager = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;


};

util.inherits(AgentManager, EventEmitter);

AgentManager.prototype.onHeartBeat = function(handler){
    this.on('heart-beat', handler);
};
AgentManager.prototype.heartBeat = function(handler){
    this.on('heart-beat', handler);
};


module.exports = AgentManager;
