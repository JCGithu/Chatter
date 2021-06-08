const krakenBase = 'https://api.twitch.tv/kraken/';
const krakenClientID = 'aoeui67um8kplm43pi2y2b5qlboeyw';
const request = require('./Fetch.js');
require('dotenv').config();

module.exports = function kraken(opts) {
  let defaults = {
    base: krakenBase,
    headers: {
      'Client-ID': process.env.CLIENTID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  };
  return request(Object.assign(defaults, opts));
};
