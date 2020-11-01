const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages(
      id INTEGER PRIMARY KEY ASC AUTOINCREMENT,
      room_name TEXT NOT NULL,
      to_user TEXT NOT NULL,
      from_user TEXT NOT NULL,
      message TEXT NOT NULL
    );
  `);
});

module.exports = db;
