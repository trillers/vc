var BrokerBuilder = require('./BrokerBuilder');
var BrokerFactory = {};

/**
 *  var open = require('amqplib').connect('amqp://localhost');
 *  var brokerPromise = BrokerFactory.create(open);
 *  brokerPromise.then(function(broker){
 *      //TODO:
 *  });
 *
 * @param open amqp open promise
 * @returns {*}
 */
BrokerFactory.create = function(open){
    var builder = BrokerBuilder.create();

    open.then(function(conn) {  //Init producer channel
        return conn.createChannel()
            .then(
                function (ch) {
                    builder.setProducerChannel(ch);
                },
                function (err) {
                    //TODO
                }
            ).then(function(){
                return conn;
            });
    }).then(function(conn) {  //Init consumer channel
        return conn.createChannel().then(
            function(ch) {
                builder.setConsumerChannel(ch);
            },
            function(err){
                //TODO
            });
    });

    return open.then(function() {
        return builder.build();
    });
};

module.exports = BrokerFactory;