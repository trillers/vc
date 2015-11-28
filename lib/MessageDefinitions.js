var MessageDefinitions = {
    node: {
        heartbeat: {
            eventName: 'hearbeat',
            exchange: 'agent-manager-heartbeat',
            exchangeModel: 'direct',
            exchangeKey: 'heartbeat',
            exchangeOptions: {durable: false},
            ack: false,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {exclusive: true},
            consumeOptions: {noAck: true}
        },
        statusRequest: {
            eventName: 'status-request',
            queueName: 'node-status-request',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        },
        statusResponse: {
            eventName: 'status-response',
            queueName: 'node-status-response',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        },
        agentListRequest: {
            eventName: 'list-request',
            queueName: 'node-list-request',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        },
        agentListResponse: {
            eventName: 'list-response',
            queueName: 'node-list-response',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        },
        agentStartRequest: {
            eventName: 'agent-start-request',
            queueName: 'node-agent-start-request',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        }
    },
    agent: {
        heartbeat: {
            eventName: 'hearbeat',
            exchange: 'agent-heartbeat',
            exchangeModel: 'direct',
            exchangeKey: 'heartbeat',
            exchangeOptions: {durable: false},
            ack: false,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {exclusive: true},
            consumeOptions: {noAck: true}
        },
        statusRequest: {
            eventName: 'status-request',
            queueName: 'agent-status-request',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        },
        statusResponse: {
            eventName: 'status-response',
            queueName: 'agent-status-response',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        },
        /**
         *
         */
        startRequest: {
            eventName: 'start-request',
            queueName: 'agent-start-request',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        },
        statusChangeResponse: {
            eventName: 'status-change-response',
            queueName: 'agent-status-change-response',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        }
    }
};

module.exports = MessageDefinitions;