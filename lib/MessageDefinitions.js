var MessageDefinitions = {
    node: {
        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *  }
         */
        heartbeat: {
            eventName: 'agent-manager-heartbeat',
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

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *  }
         */
        statusRequest: {
            eventName: 'status-request',
            exchange: 'node-status-request',
            exchangeModel: 'direct',
            exchangeKey: 'status',
            exchangeOptions: {durable: false},
            ack: false,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {exclusive: true},
            consumeOptions: {noAck: true}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      RAM: String
         *      CPU: String
         *      ExceptedAgentSum: 预计
         *      ActualAgentSum: 实际
         *  }
         */
        statusResponse: {
            eventName: 'node-status-response',
            queueName: 'node-status-response',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      OldStatus: String  reference: 'started' | 'stopped' | 'interrupted'
         *      NewStatus: String
         *  }
         */
        statusChange: {
            eventName: 'node-status-change',
            queueName: 'node-status-change',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      Intention: String 'register' | 'login'
         *      Mode: 'trusted' | 'untrusted'
         *      Nickname: String  ONLY applicable if Mode is untrusted
         *      Sex: 0 1 2        ONLY applicable if Mode is untrusted
         *      Region:           ONLY applicable if Mode is untrusted
         *  }
         */
        agentStart: {
            eventName: 'agent-start',
            queueName: 'node-agent-start',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        }
    },
    agent: {
        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      AgentStatus:
         *       - starting
         *       - logging
         *       - mislogged
         *       - logged
         *       - exceptional
         *       - aborted
         *       - exited
         *  }
         */
        heartbeat: {
            eventName: 'agent-heartbeat',
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

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *  }
         */
        statusRequest: {
            eventName: 'status-request',
            exchange: 'agent-status-request',
            exchangeModel: 'direct',
            exchangeKey: 'status',
            exchangeOptions: {durable: false},
            ack: false,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {exclusive: true},
            consumeOptions: {noAck: true}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      AgentStatus: String
         *       - starting
         *       - logging
         *       - mislogged
         *       - logged
         *       - exceptional
         *       - aborted
         *       - exited
         *  }
         */
        statusResponse: {
            eventName: 'agent-status-response',
            queueName: 'agent-status-response',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      OldStatus: String
         *         reference:
         *       - starting
         *       - logging
         *       - mislogged
         *       - logged
         *       - exceptional
         *       - aborted
         *       - exited
         *      NewStatus: String
         *  }
         */
        statusChange: {
            eventName: 'agent-status-change',
            queueName: 'agent-status-change',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Intention: String 'register' | 'login'
         *      Mode: 'trusted' | 'untrusted'
         *      Nickname: String  ONLY applicable if Mode is untrusted
         *      Sex: 0 1 2        ONLY applicable if Mode is untrusted
         *      Region:           ONLY applicable if Mode is untrusted
         *
         *  }
         */
        startRequest: {
            eventName: 'start-request',
            exchange: 'agent-start-request',
            exchangeModel: 'direct',
            exchangeKey: 'start-agent',
            exchangeOptions: {durable: false},
            ack: false,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {exclusive: true},
            consumeOptions: {noAck: true}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *  }
         */
        profileRequest: {
            eventName: 'profile-request',
            exchange: 'agent-profile-request',
            exchangeModel: 'direct',
            exchangeKey: 'profile',
            exchangeOptions: {durable: false},
            ack: false,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {exclusive: true},
            consumeOptions: {noAck: true}
        },

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      OriginalHeadImgUrl: original head image url when we request profile
         *      HeadImgId: ?
         *      Nickname: String
         *      Sex: 0 1 2
         *      Region:
         *  }
         */
        profileResponse: {
            eventName: 'profile-response',
            queueName: 'agent-profile-response',
            ack: true,
            producerQueueOptions: {durable: true},
            sendToQueueOptions: {persistent: true},
            produceOptions: {},
            consumerQueueOptions: {durable: true},
            consumeOptions: {noAck: false}
        }
    }
};

module.exports = MessageDefinitions;