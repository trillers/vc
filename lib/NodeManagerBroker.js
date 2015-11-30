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
    self.listenAgentStatus();
    self.listenAgentManagerStatus();
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
    brokerHelper.broadcast.call(this, this.producerChannel, conf, startInfo);
}

/**
 * request agent manager status
 */
NodeManager.prototype.requestAgentManagerStatus = function(req){
    var conf = messageDefinitions.node.statusRequest;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, req);
}

/**
 * on agent manager status response
 */
NodeManager.prototype.onAgentManagerStatus = function(handler){
    var conf = messageDefinitions.node.statusResponse;
    this.on(conf.eventName, handler);
}

/**
 * listening agent manager status response
 **/
NodeManager.prototype.listenAgentManagerStatus = function(){
    var conf = messageDefinitions.node.statusResponse;
    brokerHelper.onAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * request agent status
 */
NodeManager.prototype.requestAgentStatus = function(req){
    var conf = messageDefinitions.agent.statusRequest;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, req);
}

/**
 * on agent status response
 */
NodeManager.prototype.onAgentStatus = function(handler){
    var conf = messageDefinitions.agent.statusResponse;
    this.on(conf.eventName, handler);
}

/**
 * listening agent status response
 **/
NodeManager.prototype.listenAgentStatus = function(){
    var conf = messageDefinitions.agent.statusResponse;
    brokerHelper.onAckRequest.call(this, this.consumerChannel, conf);
};

module.exports = NodeManager;
