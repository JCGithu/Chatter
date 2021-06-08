const tmi = require('tmi.js');
require('dotenv').config();

const opts = {
  identity: {
    username: 'colloquialbot',
    password: process.env.OAUTH,
  },
  channels: ['colloquialowl'],
};

const onMessage = require('./Handlers/onMessage');
const onWhisper = require('./Handlers/onWhisper');
const onConnect = require('./Handlers/onConnect');
const onJoin = require('./Handlers/onJoin');

module.exports = function tmiSetUp(socket) {
  const client = new tmi.client(opts);

  client.on('chat', (channel, user, message, self) => {
    onMessage(channel, user, message, self, socket);
  });
  client.on('action', (channel, user, message, self) => {
    onMessage(channel, user, message, self, socket);
  });
  client.on('whisper', (channel, user, message, self) => {
    onWhisper(channel, user, message, self, socket);
  });
  client.on('connected', (addr, port) => {
    onConnect(addr, port);
  });
  client.on('join', (channel, username, self) => {
    onJoin(channel, username, self);
  });

  client.connect();
};
