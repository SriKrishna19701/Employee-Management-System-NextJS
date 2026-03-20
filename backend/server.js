const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./schema/connectDB');
require('dotenv').config();

app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.json({ message: 'Health OK' });
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
    .on('error', (err) => {
      console.error('Server failed to start:', err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database, exiting.', err);
    process.exit(1);
  });


