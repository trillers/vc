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
Agent.prototype.init = function(){
    this.listenAgentManagerHeartBeat();
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
    var q = 'agent-manager-heartbeat';

    this.producerChannel.assertQueue(q, {durable: false});
    this.producerChannel.sendToQueue(q, new Buffer(JSON.stringify(beatInfo)));
    console.log('agent manager send a heartbeat: ');
    console.log(beatInfo);
};

/**
 * listening agent manager heartbeat queue
 **/
AgentManager.prototype.listenAgentManagerHeartBeat = function(){
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

module.exports = AgentManager;
