var channels = require('../channels-setting');

function Service(mqPubClient, mqSubClient){
    this.pubClient = mqPubClient;
    this.subClient = mqSubClient;
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
    this.subscribeAll();
    this.subClient.on('message', self._handleMessage.call(self));
};

proto._handleMessage = function(channel, message){

};

proto.heartBeatResponse = function(){
    
};

module.exports = function(pub, sub){
    return new Service(pub, sub);
};