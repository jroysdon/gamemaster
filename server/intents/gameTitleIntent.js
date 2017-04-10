'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {

  // console.log("intentData : ");
  // console.log(intentData);

    if(intentData.intent[0].value !== 'gameTitle')
        return cb(new Error(`Expected gameTitle intent, got ${intentData.intent[0].value}`));

        // console.log("---- search_query : ");
        // console.log(intentData.local_search_query[0].value);

    if(!intentData.local_search_query) return cb(new Error('Missing game title in gametitle intent'));

    // const gameTitle = intentData.location[0].value.replace(/,.?gamemaster/i, '');
    const gameTitle = intentData.local_search_query[0].value

    //console.log("gameTitle : " + gameTitle);

    const service = registry.get('gameTitle');
    if(!service) return cb(false, 'No Game Title service available');

    request.get(`http://${service.ip}:${service.port}/service/${gameTitle}`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            return cb(false, `I had a problem finding the game title: ${gameTitle}`);
        }

        return cb(false, `${res.body.result}`);
    });
}
