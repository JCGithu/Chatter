const kraken = require('./Kraken');

const twitchBadgeCache = {
  data: { global: {} },
};

function getBadges(channel) {
  return kraken({
    base: 'https://badges.twitch.tv/v1/badges/',
    endpoint: (channel ? `channels/${channel}` : 'global') + '/display',
    qs: { language: 'en' },
  }).then((data) => data.badge_sets);
}

module.exports = {
  getBadges,
  twitchBadgeCache,
};
