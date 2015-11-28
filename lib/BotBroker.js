var util = require('util');
var EventEmitter = require('events').EventEmitter;
var messageDefinitions = require('./MessageDefinitions');
var brokerHelper = require('./BrokerHelper');

var Bot = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

util.inherits(Bot, EventEmitter);

/**
 * bot broker init
 */
Bot.prototype._init = function(){
    this.listenStatusChange();
    //TODO
}

/**
 * send start agent request
 * @param startInfo
 */
Bot.prototype.startAgent = function(startInfo){
    var conf = messageDefinitions.agent.startRequest;
    brokerHelper.ackRequest.call(this, this.producerChannel, conf, startInfo);
}

/**
 * listening agent status change request
 **/
Bot.prototype.listenStatusChange = function(){
    var conf = messageDefinitions.agent.statusRequest;
    brokerHelper.listenAckRequest.call(this, this.consumerChannel, conf);
};

/**
 * on agent status change request
 * @param handler
 **/
Bot.prototype.onStatusChange = function(handler){
    this.on(messageDefinitions.agent.statusRequest.eventName, handler);
};

module.exports = Bot;
