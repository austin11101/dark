const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { formatInTimeZone } = require('date-fns-tz');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./notifications.db');

// Endpoint to receive notifications from the React app
app.post('/notify', (req, res) => {
  const { button, mode } = req.body;

  if (!button || !mode) {
    return res.status(400).json({ error: 'Missing button or mode in request' });
  }

  // Get the current time in South African Standard Time
  const timestamp = formatInTimeZone(new Date(), 'Africa/Johannesburg', "yyyy-MM-dd'T'HH:mm:ssXXX");

  // Store notification in the database
  db.run(`INSERT INTO notifications (button, mode, timestamp) VALUES (?, ?, ?)`, [button, mode, timestamp], function(err) {
    if (err) {
      console.error('Error inserting notification:', err.message);
      return res.status(500).json({ error: 'Failed to store notification' });
    }
    console.log(`Notification stored: Button - ${button}, Mode - ${mode}, Time - ${timestamp}`);
    res.status(200).json({ message: 'Notification received', timestamp });
  });
});

app.listen(PORT, () => {
  console.log(`Notification server is running on http://localhost:${PORT}`);
});
