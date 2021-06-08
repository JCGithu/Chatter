const express = require('express');
const expressApp = express();
var socket = require('socket.io');

const tmiSetUp = require('./tmiSetUp');

module.exports = function serverSetUp() {
  const server = expressApp.listen(3000, () => {
    console.log('Server listening...');
  });
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });
  io.sockets.on('connection', function (socket) {
    console.log('New connection: ' + socket.id);
    tmiSetUp(socket);
  });
  io.sockets.on('disconnect', function () {
    console.log('disconnect');
    io.sockets.disconnect();
  });
};
