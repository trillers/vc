var util = require('util');
var EventEmitter = require('events').EventEmitter;
var messageDefinitions = require('./MessageDefinitions');
var brokerHelper = require('./BrokerHelper');

var NodeManager = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

util.inherits(NodeManager, EventEmitter);

/**
 * bot broker init
 */
NodeManager.prototype._init = function(){
    var self = this;
    self.listenStartAgent();
    return self.listenAgentHeartBeat()
        .then(function(){
            return self;
        });
    //TODO
}

/**
 * on agent heartbeat
 * @param handler
 **/
NodeManager.prototype.onHeartBeat = function(handler){
    this.on(messageDefinitions.agent.heartbeat.eventName, handler);
};

/**
 * on vb start agent request
 * @param handler
 **/
NodeManager.prototype.onStartAgent = function(handler){
    this.on(messageDefinitions.agent.startRequest.eventName, handler);
};

/**
 * listening agent heartbeat queue
 **/
NodeManager.prototype.listenAgentHeartBeat = function(){
    var conf = messageDefinitions.agent.heartbeat;
    return brokerHelper.listenHeartbeat.call(this, this.consumerChannel, conf);
};

/**
 * listening vb start agent request
 **/
NodeManager.prototype.listenStartAgent = function(){
    var conf = messageDefinitions.agent.startRequest;
    brokerHelper.listenAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * send start agent request
 * @param startInfo
 */
NodeManager.prototype.startAgent = function(startInfo){
    var conf = messageDefinitions.node.agentStartRequest;
    brokerHelper.ackRequest.call(this, this.producerChannel, conf, startInfo);
}

module.exports = NodeManager;
