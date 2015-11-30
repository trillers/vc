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
NodeManager.prototype.onHeartbeat = function(handler){
    this.on(messageDefinitions.agent.heartbeat.eventName, handler);
};

/**
 * on vb start agent request
 * @param handler
 **/
NodeManager.prototype.onStartAgent = function(handler){
    this.on(messageDefinitions.node.agentStart.eventName, handler);
};

/**
 * listening agent heartbeat queue
 **/
NodeManager.prototype.listenAgentHeartBeat = function(){
    var conf = messageDefinitions.agent.heartbeat;
    return brokerHelper.onBroadcast.call(this, this.consumerChannel, conf);
};

/**
 * listening vb start agent request
 **/
NodeManager.prototype.listenStartAgent = function(){
    var conf = messageDefinitions.node.agentStart;
    brokerHelper.onAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * send start agent request
 * @param startInfo
 */
NodeManager.prototype.startAgent = function(startInfo){
    var conf = messageDefinitions.agent.startRequest;
    brokerHelper.ackRequest.call(this, this.producerChannel, conf, startInfo);
}

module.exports = NodeManager;
