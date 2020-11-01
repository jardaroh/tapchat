const io = require('socket.io-client');

const EVENTS = {
  CLIENT_CONNECT: 'connect',
  CLIENT_DISCONNECT: 'disconnect',
  IDENTIFICATION: 'identification',
  IDENTIFICATION_INIT: 'identification-init',
  IDENTIFICATION_SUCCESS: 'identification-success',
};
const socket = io();

module.exports = () => ({
  EVENTS,
  socket,
});
