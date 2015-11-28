var MessageDefinitions = {
    node: {
        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *  }
         */
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

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *  }
         */
        statusRequest: {
            eventName: 'status-request',
            queueName: 'node-status-request',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
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
            eventName: 'status-response',
            queueName: 'node-status-response',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
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
            eventName: 'status-change',
            queueName: 'node-status-change',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
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

        /**
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *  }
         */
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
            eventName: 'status-response',
            queueName: 'agent-status-response',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
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
            eventName: 'status-change',
            queueName: 'agent-status-change',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
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
            queueName: 'agent-start-request',
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
         *  }
         */
        profileRequest: {
            eventName: 'profile-request',
            queueName: 'agent-profile-request',
            ack: true,
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
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
            producerQueueOptions: {durable: false},
            produceOptions: {},
            consumerQueueOptions: {durable: false},
            consumeOptions: {noAck: false}
        }
    }
};

module.exports = MessageDefinitions;