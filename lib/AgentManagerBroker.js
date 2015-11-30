var util = require('util');
var EventEmitter = require('events').EventEmitter;
var messageDefinitions = require('./MessageDefinitions');
var brokerHelper = require('./BrokerHelper');

var AgentManager = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

util.inherits(AgentManager, EventEmitter);

/**
 * agent manager broker init
 */
AgentManager.prototype._init = function(){
    var self = this;
    return self.listenAgentManagerHeartBeat()
        .then(function(){
            return self;
        });
    //TODO
}

/**
 * on agent manager heartbeat
 * @param handler
 **/
AgentManager.prototype.onHeartBeat = function(handler){
    this.on(messageDefinitions.node.heartbeat.eventName, handler);
};

/**
 * send agent manager heartbeat
 * @param heartbeat info
 **/
AgentManager.prototype.heartBeat = function(beatInfo){
    var type = typeof beatInfo;
    if (type !== 'object') {
        return console.warn('invalid heart beat info');
    }
    var conf = messageDefinitions.node.heartbeat;
    brokerHelper.heartbeat.call(this, this.producerChannel, conf, beatInfo);
};

/**
 * listening agent manager heartbeat queue
 **/
AgentManager.prototype.listenAgentManagerHeartBeat = function(){
    var conf = messageDefinitions.node.heartbeat;
    return brokerHelper.listenHeartbeat.call(this, this.consumerChannel, conf);
};

module.exports = AgentManager;
