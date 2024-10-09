const sqlite3 = require('sqlite3').verbose();
const path = require('path');



const db = new sqlite3.Database(path.join(__dirname, 'notifications.db'), (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

//  table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    button TEXT NOT NULL,
    mode TEXT NOT NULL,
    timestamp TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table: ' + err.message);
    } else {
      console.log('Notifications table created successfully.');
    }
  });
});


db.close();
