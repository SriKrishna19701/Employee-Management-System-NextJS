const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./schema/connectDB');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Health OK' });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });

    server.on('error', (err) => {
      console.error('Server failed to start:', err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database, exiting.', err);
    process.exit(1);
  });