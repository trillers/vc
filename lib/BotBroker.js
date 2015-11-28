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
Bot.prototype._init = function(){
    var self = this;
    return self.listenAgentHeartBeat()
        .then(function(){
            return self;
        });
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
    var ex = 'agent-heartbeat';
    self.consumerChannel.assertExchange(ex, 'direct', {durable: false});

    var ok = self.consumerChannel.assertQueue('', {exclusive: true});
    return ok.then(function(q) {
        self.consumerChannel.bindQueue(q.queue, ex, 'heartbeat');
        self.consumerChannel.consume(q.queue, function (msg) {
            var beatInfo = JSON.parse(msg.content.toString());
            self.emit('heart-beat', null, beatInfo);
        }, {noAck: true});
    });
};

module.exports = Bot;
