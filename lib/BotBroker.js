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
    //TODO
}

/**
 * send start agent request
 * @param startInfo
 */
Bot.prototype.agentStart = function(startInfo){
    var conf = messageDefinitions.node.agentStart;
    brokerHelper.ackRequest.call(this, this.producerChannel, conf, startInfo);
}

module.exports = Bot;
