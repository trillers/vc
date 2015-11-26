var channels = require('../channels-setting');
var valueToKey = require('../util').valueToKey;

function Service(mqPubClient, mqSubClient){
    this.pubClient = mqPubClient;
    this.subClient = mqSubClient;
    this._handlersMap = {};
}

var proto = Service.prototype;

proto.publish = function(channel, message){
    this.pubClient.publish(channel, message);
};

proto.subscribe = function(channel){
    this.subClient.subscribe(channel)
};

proto.subscribeAll = function(){
    for(var prop in channels){
        this.subClient.subscribe(channels[prop]);
    }
};

proto.init = function(){
    var self = this;
    this.subClient.on('message', self._handleMessage.call(self));
};

proto._handleMessage = function(channel, message){
    var method = valueToKey(channel);
    if(method){
        this._handlersMap[method].forEach(function(fn){
            fn.apply(null, [JSON.parse(message)]);
        })
    }else{
        console.info('no such method in channels');
    }
};

proto.heartBeatRequest = function(data){
    this.pubClient.publish(channels.heartBeatRequest, JSON.stringify(data));
};

proto.heartBeatResponse = function(handler){
    this.subClient.subscribe(channels.heartBeatResponse);
    this._handlersMap['heartBeatResponse'].push(handler);
};

module.exports = function(pub, sub){
    return new Service(pub, sub);
};