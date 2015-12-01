var helper = {}

helper.broadcast = function(ch, conf, beatInfo){
    ch.assertExchange(conf.exchange, conf.exchangeModel, conf.exchangeOptions);

    ch.publish(conf.exchange, conf.exchangeKey, new Buffer(JSON.stringify(beatInfo)));
}

helper.onBroadcast = function(ch, conf){
    var self = this;
    ch.assertExchange(conf.exchange, conf.exchangeModel, conf.exchangeOptions);

    var ok = ch.assertQueue('', conf.consumerQueueOptions);
    return ok.then(function(q) {
        ch.bindQueue(q.queue, conf.exchange, conf.exchangeKey);
        ch.consume(q.queue, function (msg) {
            var beatInfo = JSON.parse(msg.content.toString());
            self.emit(conf.eventName, null, beatInfo);
        }, conf.consumeOptions);
    });
}

/**
 * send a need ack produce
 * @params ch
 * @params conf
 * @params msg
 */
helper.ackProduce = function(ch, conf, msg){
    ch.assertQueue(conf.queueName, conf.producerQueueOptions);
    ch.sendToQueue(conf.queueName, new Buffer(JSON.stringify(msg)), conf.sendToQueueOptions);
}

/**
 * listen a need ack consume
 * @params ch
 * @params conf
 */
helper.onAckConsume = function(ch, conf){
    var self = this;
    ch.assertQueue(conf.queueName, conf.consumerQueueOptions);
    ch.prefetch(1);
    ch.consume(conf.queueName, function(msg) {
        self.emit(conf.eventName, null, JSON.parse(msg.content.toString()));
        ch.ack(msg);
    }, conf.consumeOptions);
}

module.exports = helper;