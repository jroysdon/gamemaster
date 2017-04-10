'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'HJJTFOEP6EJRW3MFJHPO4OFEXFNAEVEN';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-161511942759-SS8HT9uMlBT8V9qOt9dS0ulP';
const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`GameMaster is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
