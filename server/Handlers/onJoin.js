const { getBTTVEmotes, bttvEmoteCache } = require('../Twitch/getEmotes');
const { getBadges, twitchBadgeCache } = require('../Twitch/getBadges');
const { twitchNameToUser } = require('../Twitch/twitchNames');

module.exports = function onJoin(channel, username, self) {
  if (!self) return;
  console.log('JOINED!');
  let chan = channel.replace(/^#/, '');
  getBTTVEmotes(bttvEmoteCache, chan);
  twitchNameToUser(chan)
    .then((user) => getBadges(user._id))
    .then((badges) => (twitchBadgeCache.data[chan] = badges));
};
