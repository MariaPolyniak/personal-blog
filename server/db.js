const mongoose = require('mongoose');

exports.setupConnection = () => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.DB_URL, OPTIONS, err => {
    if (err) {
      console.log('Error in DB connection: ' + err);
    } else {
      console.log('DB connection succeeded!');
    }
  });
}

