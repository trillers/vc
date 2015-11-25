var util = {};

util.valueToKey = function(source, value){
    var target = null;
    for(var key in source){
        if(source[key] === value){
            target = key;
        }
    }
    return target;
};

module.exports = util;