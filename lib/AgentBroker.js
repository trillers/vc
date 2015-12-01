var util = require('util');
var EventEmitter = require('events').EventEmitter;
var messageDefinitions = require('./MessageDefinitions');
var brokerHelper = require('./BrokerHelper');

var Agent = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

util.inherits(Agent, EventEmitter);

/**
 * agent broker init
 */
Agent.prototype._init = function(){
    var self = this;
    return this.listenStartAgent().then(function(){
        return self.listenStatusRequest();
    })
        .then(function(){
            return self.listenProfileRequest();
        })
        .then(function(){
        return self;
    });
    //TODO
}

/**
 * send agent  heartbeat
 * @param heartbeat info
 **/
Agent.prototype.heartbeat = function(beatInfo){
    var type = typeof beatInfo;
    if (type !== 'object') {
        return console.warn('invalid heart beat info');
    }
    var conf = messageDefinitions.agent.heartbeat;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, beatInfo);
};

/**
 * on nm start agent request
 * @param handler
 **/
Agent.prototype.onStartRequest = function(handler){
    this.on(messageDefinitions.agent.startRequest.eventName, handler);
};

/**
 * listening nm start agent request
 **/
Agent.prototype.listenStartAgent = function(){
    var conf = messageDefinitions.agent.startRequest;
    return brokerHelper.onBroadcast.call(this, this.consumerChannel, conf);
};

/**
 * send status change request
 * @param changeInfo
 */
Agent.prototype.statusChange = function(changeInfo){
    var conf = messageDefinitions.agent.statusChange;
    brokerHelper.ackProduce.call(this, this.producerChannel, conf, changeInfo);
}

/**
 * on nm status request
 * @param handler
 **/
Agent.prototype.onStatusRequest = function(handler){
    this.on(messageDefinitions.agent.statusRequest.eventName, handler);
};

/**
 * listening nm status request
 **/
Agent.prototype.listenStatusRequest = function(){
    var conf = messageDefinitions.agent.statusRequest;
    return brokerHelper.onBroadcast.call(this, this.consumerChannel, conf);
};

/**
 * send agent status
 * @param statusInfo
 **/
Agent.prototype.statusResponse = function(statusInfo){
    var type = typeof statusInfo;
    if (type !== 'object') {
        return console.warn('invalid status info');
    }
    var conf = messageDefinitions.agent.statusResponse;
    brokerHelper.ackProduce.call(this, this.producerChannel, conf, statusInfo);
};

/**
 * on nm profile request
 * @param handler
 **/
Agent.prototype.onProfileRequest = function(handler){
    this.on(messageDefinitions.agent.profileRequest.eventName, handler);
};

/**
 * listening nm status request
 **/
Agent.prototype.listenProfileRequest = function(){
    var conf = messageDefinitions.agent.profileRequest;
    return brokerHelper.onBroadcast.call(this, this.consumerChannel, conf);
};

/**
 * send agent profile
 * @param profile
 **/
Agent.prototype.profileResponse = function(profile){
    var type = typeof profile;
    if (type !== 'object') {
        return console.warn('invalid profile');
    }
    var conf = messageDefinitions.agent.profileResponse;
    brokerHelper.ackProduce.call(this, this.producerChannel, conf, profile);
};

module.exports = Agent;
