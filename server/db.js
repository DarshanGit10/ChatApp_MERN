// DB Connection File
const mongoose = require('mongoose');

const connectionUrl = 'mongodb+srv://chatApp_admin:LQMjCM5inqSz69cQ@cluster0.djv4djn.mongodb.net/chatApp?retryWrites=true&w=majority'
// .env has connection url
async function connectToMongo() {
  try {
    await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

module.exports = connectToMongo;