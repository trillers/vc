var util = require('util');
var EventEmitter = require('events').EventEmitter;

var NodeManager = function(producerChannel, consumerChannel){
    EventEmitter.call(this);
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
    this.listenAgentManagerHeartBeat();
};

util.inherits(NodeManager, EventEmitter);

/**
 * on agent manager heartbeat
 * @param handler
 **/
NodeManager.prototype.onHeartBeat = function(handler){
    this.on('heart-beat', handler);
};

/**
 * send agent manager heartbeat
 * @param heartbeat info
 **/
NodeManager.prototype.heartBeat = function(beatInfo){
    var type = typeof beatInfo;
    if (type !== 'object') {
        return console.warn('invalid heart beat info');
    }
    var q = 'agent-manager-heartbeat';

    this.producerChannel.assertQueue(q, {durable: false});
    this.producerChannel.sendToQueue(q, new Buffer(JSON.stringify(beatInfo)));
    console.log('agent manager send a heartbeat: ');
    console.log(beatInfo);
};

/**
 * listening agent manager heartbeat queue
 **/
NodeManager.prototype.listenAgentManagerHeartBeat = function(){
    var self = this;
    var q = 'agent-manager-heartbeat';
    self.consumerChannel.assertQueue(q, {durable: false});

    console.log("listening agent manager heart beat");
    self.consumerChannel.consume(q, function (msg) {
        console.log(msg.content.toString());
        var beatInfo = JSON.parse(msg.content.toString());
        self.emit('heart-beat', null, beatInfo);
    }, {noAck: true});
};

module.exports = NodeManager;
