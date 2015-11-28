var util = require('util');
var EventEmitter = require('events').EventEmitter;

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
    this.on('heart-beat', handler);
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
    var ex = 'agent-manager-heartbeat';
    this.producerChannel.assertExchange(ex, 'direct', {durable: false});

    this.producerChannel.publish(ex, 'heartbeat', new Buffer(JSON.stringify(beatInfo)));
};

/**
 * listening agent manager heartbeat queue
 **/
AgentManager.prototype.listenAgentManagerHeartBeat = function(){
    var self = this;
    var ex = 'agent-manager-heartbeat';
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

module.exports = AgentManager;
