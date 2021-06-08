const kraken = require('./Kraken');

function twitchNameToUser(username) {
  return kraken({
    endpoint: 'users',
    qs: { login: username },
  }).then(({ users }) => users[0] || null);
}

function getChan(channel = '') {
  return channel.replace(/^#/, '');
}

module.exports = {
  twitchNameToUser,
  getChan,
};
