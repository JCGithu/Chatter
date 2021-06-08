const { getChan } = require('../Twitch/twitchNames');
const { twitchBadgeCache } = require('../Twitch/getBadges');

module.exports = function formatBadges(channel, user) {
  let chan = getChan(channel);
  if (!user.badges) return [];
  let badgeGroup = Object.assign({}, twitchBadgeCache.data.global, twitchBadgeCache.data[chan] || {});
  let ele = [];
  Object.keys(user.badges).forEach((type) => {
    let version = user.badges[type];
    let group = badgeGroup[type];

    if (group && version in group.versions) {
      let url = group.versions[version].image_url_1x;
      var badgeAry = [url, type];
      ele.push(badgeAry);
    }
  }, []);
  return ele;
};
