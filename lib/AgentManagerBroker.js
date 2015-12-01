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
    return  self.listenStatusRequest()
        .then(function(){
            return self;
        });
    //TODO
}


/**
 * send agent manager heartbeat
 * @param heartbeat info
 **/
AgentManager.prototype.heartbeat = function(beatInfo){
    var type = typeof beatInfo;
    if (type !== 'object') {
        return console.warn('invalid heart beat info');
    }
    var conf = messageDefinitions.node.heartbeat;
    brokerHelper.broadcast.call(this, this.producerChannel, conf, beatInfo);
};


/**
 * on nm status request
 * @param handler
 **/
AgentManager.prototype.onStatusRequest = function(handler){
    this.on(messageDefinitions.node.statusRequest.eventName, handler);
};

/**
 * listening nm status request
 **/
AgentManager.prototype.listenStatusRequest = function(){
    var conf = messageDefinitions.node.statusRequest;
    return brokerHelper.onBroadcast.call(this, this.consumerChannel, conf);
};

/**
 * send agent manager status
 * @param statusInfo
 **/
AgentManager.prototype.statusResponse = function(statusInfo){
    var type = typeof statusInfo;
    if (type !== 'object') {
        return console.warn('invalid status info');
    }
    var conf = messageDefinitions.node.statusResponse;
    brokerHelper.ackProduce.call(this, this.producerChannel, conf, statusInfo);
};

/**
 * send status change request
 * @param changeInfo
 */
AgentManager.prototype.statusChange = function(changeInfo){
    var conf = messageDefinitions.node.statusChange;
    brokerHelper.ackProduce.call(this, this.producerChannel, conf, changeInfo);
}


module.exports = AgentManager;
