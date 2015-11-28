var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Bot = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

util.inherits(Bot, EventEmitter);

/**
 * bot broker init
 */
Agent.prototype.init = function(){
    this.listenAgentHeartBeat();
    //TODO
}

/**
 * on agent heartbeat
 * @param handler
 **/
Bot.prototype.onHeartBeat = function(handler){
    this.on('heart-beat', handler);
};

/**
 * listening agent heartbeat queue
 **/
Bot.prototype.listenAgentHeartBeat = function(){
    var self = this;
    var q = 'agent-heartbeat';
    self.consumerChannel.assertQueue(q, {durable: false});

    console.log("listening agent heart beat");
    self.consumerChannel.consume(q, function (msg) {
        console.log(msg.content.toString());
        var beatInfo = JSON.parse(msg.content.toString());
        self.emit('heart-beat', null, beatInfo);
    }, {noAck: true});
};

module.exports = Bot;
