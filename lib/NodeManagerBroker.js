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
    self.listenAgentStatusChange();
    self.listenAgentManagerStatusChange();
    self.listenProfileResponse();
    return self.listenAgentHeartBeat()
        .then(function(){
            return self.listenAgentManagerHeartBeat();
        })
        .then(function(){
            return self;
        });
    //TODO
}

/**
 * on agent heartbeat
 * @param handler
 **/
NodeManager.prototype.onAgentHeartbeat = function(handler){
    this.on(messageDefinitions.agent.heartbeat.eventName, handler);
};

/**
 * on vb start agent request
 * @param handler
 **/
NodeManager.prototype.onAgentStart = function(handler){
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
NodeManager.prototype.startRequest = function(startInfo){
    var conf = messageDefinitions.agent.startRequest;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, startInfo);
}

/**
 * request agent manager status
 */
NodeManager.prototype.agentManagerStatusRequest = function(req){
    var conf = messageDefinitions.node.statusRequest;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, req);
}

/**
 * on agent manager status response
 */
NodeManager.prototype.onAgentManagerStatusResponse = function(handler){
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
NodeManager.prototype.agentStatusRequest = function(req){
    var conf = messageDefinitions.agent.statusRequest;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, req);
}

/**
 * on agent status response
 */
NodeManager.prototype.onAgentStatusResponse = function(handler){
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

/**
 * listening agent status change request
 **/
NodeManager.prototype.listenAgentStatusChange = function(){
    var conf = messageDefinitions.agent.statusChange;
    brokerHelper.onAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * on agent status change request
 * @param handler
 **/
NodeManager.prototype.onAgentStatusChange = function(handler){
    this.on(messageDefinitions.agent.statusChange.eventName, handler);
};

/**
 * listening agent status change request
 **/
NodeManager.prototype.listenAgentManagerStatusChange = function(){
    var conf = messageDefinitions.node.statusChange;
    brokerHelper.onAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * on agent status change request
 * @param handler
 **/
NodeManager.prototype.onAgentManagerStatusChange = function(handler){
    this.on(messageDefinitions.node.statusChange.eventName, handler);
};


/**
 * request agent profile
 */
NodeManager.prototype.profileRequest = function(req){
    var conf = messageDefinitions.agent.profileRequest;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, req);
}

/**
 * listening agent profile response
 **/
NodeManager.prototype.listenProfileResponse = function(){
    var conf = messageDefinitions.agent.profileResponse;
    brokerHelper.onAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * on agent status change request
 * @param handler
 **/
NodeManager.prototype.onProfileResponse = function(handler){
    this.on(messageDefinitions.agent.profileResponse.eventName, handler);
};

/**
 * on agent manager heartbeat
 * @param handler
 **/
NodeManager.prototype.onAgentManagerHeartbeat = function(handler){
    this.on(messageDefinitions.node.heartbeat.eventName, handler);
};

/**
 * listening agent manager heartbeat queue
 **/
NodeManager.prototype.listenAgentManagerHeartBeat = function(){
    var conf = messageDefinitions.node.heartbeat;
    return brokerHelper.onBroadcast.call(this, this.consumerChannel, conf);
};

module.exports = NodeManager;
