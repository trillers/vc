var MessageDefinitions = {
    am: {
        /**
         * Message routing: am ---> node
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      Remark: String
         *  }
         */
        heartbeat: {
            eventName: 'hearbeat-am',
            queueName: 'hearbeat-am',
            queueOptions: {durable: false},
            produceOptions: {persistent: false},
            consumeOptions: {noAck: true}
        },

        /**
         * Message routing: am ---> node
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      RAM: String
         *      CPU: String
         *      ExceptedAgentSum: 预计
         *      ActualAgentSum: 实际
         *  }
         */
        infoResponse: {
            eventName: 'info-response',
            queueName: 'info-response-am',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },

        /**
         * Message routing: am ---> node
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      OldStatus: String  reference: 'started' | 'stopped' | 'interrupted'
         *      NewStatus: String
         *  }
         */
        statusChange: {
            eventName: 'status-change-am',
            queueName: 'status-change-am-node',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        }

    },

    node: {
        /**
         * Message routing: node ---> am
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *  }
         */
        infoRequest: {
            eventName: 'info-request-',
            queueName: 'info-request-node-',
            queueOptions: {durable: false},
            produceOptions: {persistent: false},
            consumeOptions: {noAck: false}
        },

        /**
         *  Message routing: node ---> am
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      Command: 'start'
         *      Intention: String 'register' | 'login'
         *      Mode: 'trusted' | 'untrusted'
         *      Nickname: String  ONLY applicable if Mode is untrusted
         *      Sex: 0 1 2        ONLY applicable if Mode is untrusted
         *      Region:           ONLY applicable if Mode is untrusted
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      Command: 'stop'
         *      Mode: 'graceful' | 'ungraceful'
         *          graceful means stop until all action messages,
         *          ungraceful means stop it right now whatever unhandled action messages there.
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *      Command: 'reload'
         *      Mode: 'graceful' | 'ungraceful'
         *          graceful means reload until all action messages,
         *          ungraceful means reload it right now whatever unhandled action messages there.
         *  }
         *
         */
        command: {
            eventName: 'command',
            queueName: 'command-node',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        }

    },

    agent: {
        /**
         * Message routing: agent ---> node
         *
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
            eventName: 'hearbeat-agent',
            queueName: 'hearbeat-agent',
            queueOptions: {durable: false},
            produceOptions: {persistent: false},
            consumeOptions: {noAck: true}
        },

        /**
         * Message routing: agent ---> node
         *
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
        agentStatusChange: {
            eventName: 'status-change-agent',
            queueName: 'status-change-agent-node',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },

        /**
         * Message routing: agent ---> bot
         *
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
        botStatusChange: {
            eventName: 'status-change',
            queueName: 'status-change-agent-bot',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  Message routing: agent ---> bot
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'profile-response'
         *      AgentId: String
         *      OriginalHeadImgUrl: original head image url when we request profile
         *      HeadImgId: ?
         *      Nickname: String
         *      Sex: 0 1 2
         *      Region:
         *  }
         */
        actionIn: {
            eventName: 'action-in',
            queueName: 'action-in',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  Message routing: agent ---> bot
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: String, reference action definitions
         *      AgentId: String
         *      Took: milliseconds it took to execute the action
         *      Code: String reference code definitions
         *      Desc: String
         *  }
         */
        actionFeedback: {
            eventName: 'action-feedback',
            queueName: 'action-feedback',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        }
    },


    bot: {

        /**
         *  Message routing: bot ---> node ( ---> am)
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Command: 'start'
         *      Intention: String 'register' | 'login'
         *      Mode: 'trusted' | 'untrusted'
         *      Nickname: String  ONLY applicable if Mode is untrusted
         *      Sex: 0 1 2        ONLY applicable if Mode is untrusted
         *      Region:           ONLY applicable if Mode is untrusted
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Command: 'stop'
         *      Mode: 'graceful' | 'ungraceful'
         *          graceful means stop until all action messages,
         *          ungraceful means stop it right now whatever unhandled action messages there.
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Command: 'reload'
         *      Mode: 'graceful' | 'ungraceful'
         *          graceful means reload until all action messages,
         *          ungraceful means reload it right now whatever unhandled action messages there.
         *  }
         *
         */
        command: {
            eventName: 'command',
            queueName: 'command-bot',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  Message routing: bot ---> agent
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      NodeId: String
         *      AgentId: String
         *  }
         */
        actionOut: {
            eventName: 'action-out',
            queueName: 'action-out',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        }
    }
};

module.exports = MessageDefinitions;