var channels = require('./lib/channels-setting');
var serviceFactory = require('./lib/proxy/redis-pubsub');
module.exports = function(client){
    var service = {};
    service = serviceFactory(pub, sub);
    service.init();
    return service;
};
module.exports.channels = channels;