var settings = {
    redis:{
        mode:'single',
        host: '127.0.0.1',
        port: 6379,
        auth:'trillers',
        sentinel: {
            hosts:[{host: '127.0.0.1', port: 26379}],
            masterName:'mymaster'
        }
    }
};

module.exports = settings;