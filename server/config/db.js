const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};