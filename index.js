var queueNames = require('./lib/queue-name-map');
var VCFactory = require('./lib/proxy/VCFactory');
module.exports = function(){
    var factory = new VCFactory();
    return factory;
};
module.exports.queueNames = queueNames;