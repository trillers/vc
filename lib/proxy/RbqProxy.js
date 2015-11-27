var queueNames = require('../queue-name-map');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

var RbqProxy = function(client){
    EventEmitter.call(this);
    this.client = client;
}

inherits(RbqProxy, EventEmitter);

/**
 * RbqProxy init
 */
RbqProxy.prototype.init = function(){
    this.listenBotManagerHeartBeat(this.client);
    this.listenBotAgentHeartBeat(this.client);
}

/**
 * send sbot manager heartbeat
 * @param beatInfo
 **/
RbqProxy.prototype.sendManagerHeartBeat = function(beatInfo){
    var type = typeof beatInfo;
    if(type !== 'object'){
        return console.warn('invalid heart beat info');
    }
    this.client.createChannel(function(err, ch) {
        var q = queueNames.managerHeartBeat;

        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, new Buffer(JSON.stringify(beatInfo)));
        console.log('send a heartbeat: ');
        console.log(beatInfo);
    });
}

/**
 * listen manager heartbeat mq
 **/
RbqProxy.prototype.listenBotManagerHeartBeat = function(){
    var self = this;
    self.client.createChannel(function(err, ch) {
        if(err){
            console.log('onManagerHeartBeat createChannel err: ' + err);
            return;
        }
        var q = queueNames.managerHeartBeat;
        ch.assertQueue(q, {durable: false});

        console.log("listening sbot manager heartbeat");
        ch.consume(q, function(msg) {
            console.log(msg.content.toString());
            var beatInfo = JSON.parse(msg.content.toString());
            self.emit('manager-heartbeat', err, beatInfo);
        }, {noAck: true});
    });
}

/**
 * handler client on manager heartbeat event
 * @param handler
 **/
RbqProxy.prototype.onManagerHeartBeat = function(handler){
    this.on('manager-heartbeat', handler);
}

/**
 * send sbot agent heartbeat
 * @param beatInfo
 **/
RbqProxy.prototype.sendAgentHeartBeat = function(beatInfo){
    var type = typeof beatInfo;
    if(type !== 'object'){
        return console.warn('invalid heart beat info');
    }
    this.client.createChannel(function(err, ch) {
        var q = queueNames.agentHeartBeat;

        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, new Buffer(JSON.stringify(beatInfo)));
        console.log('send a heartbeat: ');
        console.log(beatInfo);
    });
}

/**
 * listen agent heartbeat mq
 **/
RbqProxy.prototype.listenBotAgentHeartBeat = function(){
    var self = this;
    self.client.createChannel(function(err, ch) {
        if(err){
            console.log('onAgentHeartBeat createChannel err: ' + err);
            return;
        }
        var q = queueNames.agentHeartBeat;
        ch.assertQueue(q, {durable: false});

        console.log("listening sbot agent heartbeat");
        ch.consume(q, function(msg) {
            console.log(msg.content.toString());
            var beatInfo = JSON.parse(msg.content.toString());
            self.emit('agent-heartbeat', err, beatInfo);
        }, {noAck: true});
    });
}

/**
 * handler client on agent heartbeat event
 * @param handler
 **/
RbqProxy.prototype.onAgentHeartBeat = function(handler){
    this.on('agent-heartbeat', handler);
}


module.exports = RbqProxy;

