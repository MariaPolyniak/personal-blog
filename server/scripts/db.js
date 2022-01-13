const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

exports.setupConnection = () => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.MONGODB_URL, OPTIONS, err => {
    if (err) {
      console.log('Error in DB connection: ' + err);
    } else {
      console.log('DB connection succeeded!');
    }
  });
}

