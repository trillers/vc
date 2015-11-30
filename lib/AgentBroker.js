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
    this.listenStartAgent();
    //TODO
}

/**
 * send agent  heartbeat
 * @param heartbeat info
 **/
Agent.prototype.heartBeat = function(beatInfo){
    var type = typeof beatInfo;
    if (type !== 'object') {
        return console.warn('invalid heart beat info');
    }
    var conf = messageDefinitions.agent.heartbeat;
    brokerHelper.heartbeat.call(this, this.producerChannel, conf, beatInfo);
};

/**
 * on nm start agent request
 * @param handler
 **/
Agent.prototype.onStartAgent = function(handler){
    this.on(messageDefinitions.node.agentStartRequest.eventName, handler);
};

/**
 * listening nm start agent request
 **/
Agent.prototype.listenStartAgent = function(){
    var conf = messageDefinitions.node.agentStartRequest;
    brokerHelper.listenAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * send status change request
 * @param changeInfo
 */
Agent.prototype.statusChange = function(changeInfo){
    var conf = messageDefinitions.agent.statusRequest;
    brokerHelper.ackRequest.call(this, this.producerChannel, conf, changeInfo);
}

module.exports = Agent;
