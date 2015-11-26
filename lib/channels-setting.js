module.exports = {
    startUp: 'start-up',
    /**
     * {
     *     bid:    (String)
     * }
     */
    heartBeatRequest: 'heartbeat',
    /**
     * {
     *     bid:    (String)
     *     status: enum ['running', 'stopped', 'abnormalStopped']
     * }
     */
    heartBeatResponse: 'heartbeat-response',
    ///*
    // * {
    // *     ToUserName: bid
    // *     FromUserName: botid (bucketid:openid)
    // *     MsgType: 'text'
    // *     Content: to-be-sent text String
    // * }
    // */
    //messageSend: 'sbot:message-send',
    //
    ///*
    // * {
    // *     botid: (String)
    // * }
    // */
    //botStartRequest: 'sbot:start',
    //
    ///*
    // * {
    // *     botid: (String)
    // * }
    // */
    //botStopRequest: 'sbot:stop',
    //
    ///*
    // * {
    // *     botid: (String)
    // *     bid: (String)
    // * }
    // */
    //profileRequest: 'sbot:profile-request',
    //
    ///*
    // * {
    // *     botid: (String)
    // * }
    // */
    //groupListRequest: 'sbot:group-list-request',
    //
    ///*
    // * {
    // *     botid: (String)
    // * }
    // */
    //contactListRemarkRequest: 'sbot:contact-list-remark-request',
    //
    ///*
    // * {
    // *     botid: (String)
    // * }
    // */
    //contactListRequest: 'sbot:contact-list-request',
    //
    //profileResponse: 'sbot:profile',
    //groupListResponse: 'sbot:group-list',
    //messageReceived: 'sbot:message',
    //contactAdded: 'sbot:contact-added',
    //contactRemarked: 'sbot:contact-remarked',
    //contactProfile: 'sbot:contact-profile',
    //needLogin: 'sbot:need-login',
    //login: 'sbot:login',
    //abort: 'sbot:abort'
};