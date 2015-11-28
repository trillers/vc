var util = require('util');
var EventEmitter = require('events').EventEmitter;

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
    var ex = 'agent-heartbeat';
    this.producerChannel.assertExchange(ex, 'direct', {durable: false});

    this.producerChannel.publish(ex, 'heartbeat', new Buffer(JSON.stringify(beatInfo)));
};

module.exports = Agent;
