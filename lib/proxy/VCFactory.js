var RbqProxy = require('./RbqProxy');

var VCFactory = function(){}

var proto = VCFactory.prototype;

proto.vcRabbitMQComplete = function(rbqClient){
    var rbqProxy = new RbqProxy(rbqClient);
    rbqProxy.init();

    return rbqProxy;
}

//TODO another third mq proxy

module.exports = VCFactory;