const formatBadges = require('../Message/formatBadges');
const formatEmotes = require('../Message/formatEmotes');

module.exports = function onMessage(channel, user, message, self, socket) {
  if (self) return;
  let formattedMsg = formatEmotes(channel, message, user.emotes);
  let style = { badges: formatBadges(channel, user) };
  socket.emit('newMsg', formattedMsg, user['display-name'], style);
};
