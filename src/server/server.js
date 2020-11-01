// Server must be programmed with the old require API as node does not support proper imports
// and I can not be bothered to set up an extensive babel setup for the server side. Sorry.

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { EVENTS } = require('../composition/useSocket')();

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);

const users = [];

io.on(EVENTS.CLIENT_CONNECT, (socket) => {
  socket.on(EVENTS.IDENTIFICATION_INIT, () => {
    socket.emit(EVENTS.IDENTIFICATION);
  });

  socket.on(EVENTS.IDENTIFICATION, (data) => {
    const existingUser = users.find((user) => user.username === data.username);
    if (!existingUser) {
      users.push(data);
    }
    io.emit(EVENTS.USER_CONNECT, data);
  });
});

httpServer.listen(9000, () => {
  console.log('listening on :9000');
});
