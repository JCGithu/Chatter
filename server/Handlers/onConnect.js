const { getBadges, twitchBadgeCache } = require('../Twitch/getBadges');
const { getBTTVEmotes, bttvEmoteCache } = require('../Twitch/getEmotes');

module.exports = function onConnect(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  getBTTVEmotes(bttvEmoteCache);
  getBadges().then((badges) => (twitchBadgeCache.data.global = badges));
};
