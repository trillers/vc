var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Agent = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

util.inherits(Agent, EventEmitter);

/**
 * send agent  heartbeat
 * @param heartbeat info
 **/
Agent.prototype.heartBeat = function(beatInfo){
    var type = typeof beatInfo;
    if (type !== 'object') {
        return console.warn('invalid heart beat info');
    }
    var q = 'agent-heartbeat';

    this.producerChannel.assertQueue(q, {durable: false});
    this.producerChannel.sendToQueue(q, new Buffer(JSON.stringify(beatInfo)));
    console.log('agent send a heartbeat: ');
    console.log(beatInfo);
};

module.exports = Agent;
