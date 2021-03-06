// Server must be programmed with the old require API as node does not support proper imports
// and I can not be bothered to set up an extensive babel setup for the server side. Sorry.

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { EVENTS } = require('../composition/useSocket')();
const db = require('./db');

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);

const users = [];
const userSockets = {};

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/messages/:roomName', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM messages WHERE room_name='${req.params.roomName}'
    ORDER BY id DESC
    LIMIT 15`, (err, rows) => {
      if (!err) {
        res.send(rows.map((row) => ({
          roomName: row.room_name,
          to: row.to_user,
          from: row.from_user,
          message: row.message,
        })).reverse());
      }
    });
  });
});

io.on(EVENTS.CLIENT_CONNECT, (socket) => {
  socket.on(EVENTS.IDENTIFICATION_INIT, () => {
    socket.emit(EVENTS.IDENTIFICATION);
  });

  socket.on(EVENTS.IDENTIFICATION, (data) => {
    const existingUser = users.find((user) => user.username === data.username);
    if (!existingUser) {
      users.push(data);
    }
    if (!userSockets[data.username]) {
      userSockets[data.username] = [socket];
    } else {
      userSockets[data.username] = [...userSockets[data.username], socket];
    }
    io.emit(EVENTS.USER_CONNECT, data);
  });

  socket.on(EVENTS.USER_DISCONNECT, (data) => {
    io.emit(EVENTS.USER_DISCONNECT, data);
    const userIndex = users.findIndex((user) => user.username === data.username);
    users.splice(userIndex, 1);
  });

  socket.on(EVENTS.MESSAGE_TO_USER, (data) => {
    db.serialize(() => {
      db.run(`INSERT INTO messages (
        room_name,
        to_user,
        from_user,
        message
      ) VALUES (
        '${data.roomName}',
        '${data.to}',
        '${data.from}',
        '${data.message}'
      )`);
    });
    (userSockets[data.to] || []).forEach((s) => {
      s.emit(EVENTS.MESSAGE_FROM_USER, data);
    });
  });
});

httpServer.listen(9000, () => {
  console.log('listening on :9000');
});
