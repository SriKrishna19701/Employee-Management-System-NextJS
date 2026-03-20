const mongoose = require('mongoose');
require('dotenv').config();

function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    const err = new Error('MONGO_URI is not set in environment variables');
    console.error(err.message);
    return Promise.reject(err);
  }

  return mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Database has been connected successfully');
    })
    .catch((err) => {
      console.error('Error while connecting database:', err);
      throw err;
    });
}

module.exports = connectDb;
