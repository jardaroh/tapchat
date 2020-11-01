const io = require('socket.io-client');

const EVENTS = {
  CLIENT_CONNECT: 'connect',
  CLIENT_DISCONNECT: 'disconnect',
  USER_CONNECT: 'user-connect',
  USER_DISCONNECT: 'user-disconnect',
  IDENTIFICATION: 'identification',
  IDENTIFICATION_INIT: 'identification-init',
  IDENTIFICATION_SUCCESS: 'identification-success',
  MESSAGE_TO_USER: 'message-to-user',
  MESSAGE_FROM_USER: 'message-from-user',
};
const socket = io();

module.exports = () => ({
  EVENTS,
  socket,
});
