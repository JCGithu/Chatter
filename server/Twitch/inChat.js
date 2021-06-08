const request = require('./Fetch');
const { getChan } = require('./twitchNames');

async function pullChatters(channel) {
  let chan = getChan(channel);
  let api = `http://tmi.twitch.tv/group/user/${chan}/chatters`;
  return new Promise((resolve) => {
    const response = request({ base: api });
    resolve(response);
  });
}

module.exports = function checkInChat(msgUser, channel) {
  let data = await pullChatters(channel);
  if (!data) return false;

  let users = [];

  Object.values(data.chatters).forEach((e) => {
    if (Array.isArray(e)) {
      users = users.concat(e);
    }
  });

  if (users.includes(msgUser)) return true;
  return false;
};
